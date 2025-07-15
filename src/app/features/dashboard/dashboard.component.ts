import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {DefaultLayoutDirective} from 'ng-flex-layout';
import {CardAchievementComponent} from '../../shared/components/card-achievement/card-achievement.component';
import {CardExperienceComponent} from '../../shared/components/card-experience/card-experience.component';
import {CardFaqComponent} from '../../shared/components/card-faq/card-faq.component';
import {CardProfileSummaryComponent} from '../../shared/components/card-profile-summary/card-profile-summary.component';
import {CardProjectComponent} from '../../shared/components/card-project/card-project.component';
import {environment} from '../../../environments/environment';
import {EnvironmentFeatureFlags} from '../../core/models/configuration.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    DefaultLayoutDirective,
    CardAchievementComponent,
    CardExperienceComponent,
    CardFaqComponent,
    CardProfileSummaryComponent,
    CardProjectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  featureFlags?: EnvironmentFeatureFlags = environment.featureFlags;
}
