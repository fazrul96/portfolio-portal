import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {COMMON_CONSTANTS} from '../../../constants/common.constants';
import {Store} from '@ngxs/store';
import {Subject, timer} from 'rxjs';
import {PostExperience} from '../../../../store/experience/experience.action';
import {splitByComma} from '../../../utils/string.utils';
import {MatOptgroup, MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {formatDate} from '@angular/common';
import {ExperienceState} from '../../../../store/experience/experience.state';
import {ExperienceCategories} from '../../../types/portal.type';
import {LocationCode, LocationLabels} from '../../../enums/location.enum';
import {IndustryCode, IndustryLabels} from '../../../enums/industry.enum';
import {CompanyCategoryCode, CompanyCategoryLabels} from '../../../enums/company.enum';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-experience-creation',
  templateUrl: './dialog-experience-creation.component.html',
  styleUrl: './dialog-experience-creation.component.scss',
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckbox,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    FormsModule,
    MatOptgroup,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogExperienceCreationComponent  implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<DialogExperienceCreationComponent> = inject(MatDialogRef);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly unsubscribe$ = new Subject();

  experienceForm!: FormGroup;
  submitted: boolean = false;

  companyCategoryOptions: CompanyCategoryCode[] = Object.values(CompanyCategoryCode);
  industryOptions: IndustryCode[] = Object.values(IndustryCode);
  locationGroups = [
    {
      label: 'Selangor',
      options: [
        LocationCode.AMPANG,
        LocationCode.BANGI,
        LocationCode.BATU_CAVES,
        LocationCode.CYBERJAYA,
        LocationCode.GOMBAK,
        LocationCode.KAJANG,
        LocationCode.KLANG,
        LocationCode.PETALING_JAYA,
        LocationCode.PUCHONG,
        LocationCode.RAWANG,
        LocationCode.SEMENYIH,
        LocationCode.SERDANG,
        LocationCode.SEPANG,
        LocationCode.SHAH_ALAM,
        LocationCode.SUBANG_JAYA,
        LocationCode.SUNGAI_BULOH,
      ],
    },
    {
      label: 'Kuala Lumpur',
      options: [LocationCode.KUALA_LUMPUR],
    },
    {
      label: 'Putrajaya',
      options: [LocationCode.PUTRAJAYA],
    },
    {
      label: 'Penang',
      options: [
        LocationCode.GEORGE_TOWN,
        LocationCode.BUTTERWORTH,
        LocationCode.BUKIT_MERTAJAM,
      ],
    },
    {
      label: 'Johor',
      options: [
        LocationCode.JOHOR_BAHRU,
        LocationCode.BATU_PAAT,
        LocationCode.MUAR,
        LocationCode.KLUANG,
        LocationCode.SKUDAI,
      ],
    },
    {
      label: 'Other States',
      options: [
        LocationCode.IPOH,
        LocationCode.TAIPING,
        LocationCode.KUANTAN,
        LocationCode.TEMERLOH,
        LocationCode.KOTA_BHARU,
        LocationCode.KANGAR,
        LocationCode.ALOR_SETAR,
        LocationCode.SUNGAI_PETANI,
        LocationCode.LANGKAWI,
        LocationCode.MELAKA,
        LocationCode.SEREMBAN,
        LocationCode.NILAI,
      ],
    },
    {
      label: 'East Malaysia',
      options: [
        LocationCode.KOTA_KINABALU,
        LocationCode.SANDAKAN,
        LocationCode.TAWAU,
        LocationCode.KUCHING,
        LocationCode.MIRI,
        LocationCode.SIBU,
        LocationCode.BINTULU,
      ],
    },
  ];

  experienceCategories: ExperienceCategories[] | undefined = [];

  setMonthAndYear(normalizedMonth: Moment, controlName: string, datepicker: MatDatepicker<Moment>) {
    const ctrlValue: any = this.experienceForm.get(controlName)?.value ?? moment();
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year());
    this.experienceForm.get(controlName)?.setValue(ctrlValue);
    datepicker.close();
  }

  initForms(): void {
    this.experienceForm = this.formBuilder.group({
      alias: new FormControl(COMMON_CONSTANTS.EMPTY_STRING, Validators.required),
      role: new FormControl(COMMON_CONSTANTS.EMPTY_STRING, Validators.required),
      companyName: new FormControl(COMMON_CONSTANTS.EMPTY_STRING, Validators.required),
      companyType: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      categoryId: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      industry: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      location: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      startDate: new FormControl(COMMON_CONSTANTS.EMPTY_STRING, Validators.required),
      endDate: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      isCurrent: new FormControl(false),
      icon: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      image: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      summary: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      responsibilities: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
      achievements: new FormControl(COMMON_CONSTANTS.EMPTY_STRING),
    });
  }

  ngOnInit(): void {
    this.initForms();

    this.store.select(ExperienceState.getExperienceCategories).subscribe(experienceCategories => {
      this.experienceCategories = experienceCategories;
    });

    this.experienceForm.get('isCurrent')?.valueChanges.subscribe((val) => {
      const endDateControl = this.experienceForm.get('endDate');
      if (val) {
        endDateControl?.disable();
        endDateControl?.setValue(null);
      } else {
        endDateControl?.enable();
        endDateControl?.setValue(COMMON_CONSTANTS.EMPTY_STRING);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.experienceForm.invalid) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return;
    }
    const rawValue: any = this.experienceForm.getRawValue();
    const payload = {
      ...rawValue,
      startDate: formatDate(rawValue.startDate, 'MM/yyyy', 'en-US'),
      endDate: rawValue.isCurrent
        ? 'Present'
        : formatDate(rawValue.endDate, 'MM/yyyy', 'en-US'),
      responsibilities: splitByComma(rawValue.responsibilities),
      achievements: splitByComma(rawValue.achievements),
    };

    this.store.dispatch(new PostExperience(payload)).subscribe({
      next: (): void => {
        this.snackBar.open('Experience saved successfully!', 'Close', {
          duration: 3000
        });

        timer(500).subscribe((): void => {
          this.dialogRef.close(payload);
        });
      },
      error: (err: any): void => {
        this.snackBar.open(
          err?.message ?? 'Unexpected error occurred while saving experience.', 'Close', {
            duration: 4000
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  protected readonly LocationLabels: Record<LocationCode, string> = LocationLabels;
  protected readonly CompanyCategoryLabels: Record<CompanyCategoryCode, string> = CompanyCategoryLabels
  protected readonly IndustryLabels: Record<IndustryCode, string> = IndustryLabels;
}
