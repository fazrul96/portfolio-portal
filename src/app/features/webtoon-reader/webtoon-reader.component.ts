import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Unzipped, unzipSync} from 'fflate';
import {GetPresignUrl} from '../../store/file/file.action';
import {filter, map, Observable, Subject, switchMap, take, takeUntil} from 'rxjs';
import {FileState} from '../../store/file/file.state';
import {Store} from '@ngxs/store';
import {S3_API} from '../../shared/constants/api.constants';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {ROUTE_PATHS} from '../../app.routes';
import {formatCamelCase} from '../../shared/utils/string.utils';

@Component({
  selector: 'app-webtoon-reader',
  imports: [],
  templateUrl: './webtoon-reader.component.html',
  styleUrl: './webtoon-reader.component.scss'
})
export class WebtoonReaderComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly route : ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly unsubscribe$ = new Subject();

  images: string[] = [];
  title: string = COMMON_CONSTANTS.EMPTY_STRING;
  chapter: string = COMMON_CONSTANTS.EMPTY_STRING;
  file: string = COMMON_CONSTANTS.EMPTY_STRING;
  breadcrumbs: Array<{ label: string; link?: string }> = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        map(this.extractParams),
        filter(this.hasValidParams),
        switchMap(({ title, chapter }) => {
          this.breadcrumbs = [
            { label: formatCamelCase(ROUTE_PATHS.webtoon), link: ROUTE_PATHS.webtoon },
            { label: formatCamelCase(title), link: `${ROUTE_PATHS.webtoonSeries}/${title}` },
            { label: `Chapter ${chapter}` },
          ];

          return this.fetchPresignedUrl(title, chapter);
        })
      )
      .subscribe(({ url }): void => {
        this.file = url;
        this.loadChapterZip(url);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  goBack(): void {
    this.router.navigate(['/webtoon-series']);
  }

  readonly extractParams = (params: ParamMap): { title: string; chapter: string } => ({
    title: params.get('title') ?? this.title,
    chapter: params.get('webtoonChapter') ?? this.chapter
  });

  readonly hasValidParams = ({ title, chapter }: { title: string; chapter: string }): boolean =>
    !!title && !!chapter;

  private fetchPresignedUrl(title: string, chapter: string): Observable<{ url: string; title: string; chapter: string }> {
    const zipPath: string = this.buildZipPath(title, chapter);

    return this.store.dispatch(new GetPresignUrl(zipPath)).pipe(
      switchMap(() => this.store.select(FileState.getPresignedUrl)),
      filter((url: string | undefined): url is string => !!url),
      take(1),
      map((url: string) => ({ url, title, chapter }))
    );
  }

  private buildZipPath(title: string, chapter: string): string {
    return `${S3_API.PREFIXES.WEBTOONS}${title}/${title}-chapter-${chapter}.zip`;
  }

  private async loadChapterZip(zipUrl: string): Promise<void> {
    try {
      const response: Response = await fetch(zipUrl);
      if (!response.ok) throw new Error(`Failed to load ZIP from ${zipUrl}`);

      const buffer: ArrayBuffer = await response.arrayBuffer();
      const zipEntries: Unzipped = unzipSync(new Uint8Array(buffer));

      this.images = this.extractSortedImages(zipEntries);
    } catch (error) {
      console.error('Error loading/unzipping chapter:', error);
    }
  }

  private extractSortedImages(zipEntries: Record<string, Uint8Array>): string[] {
    return Object.entries(zipEntries)
      .filter(([name]): boolean => /\.(jpe?g|png|webp)$/i.test(name))
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([_, data]): string => {
        const blob = new Blob([data], { type: 'image/*' });
        return URL.createObjectURL(blob);
      });
  }

  protected readonly ROUTE_PATHS = ROUTE_PATHS;
}
