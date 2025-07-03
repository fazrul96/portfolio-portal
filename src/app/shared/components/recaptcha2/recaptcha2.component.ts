import {Component, Input} from '@angular/core';
import {NgxCaptchaModule} from 'ngx-captcha';
import {environment} from '../../../../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import {EnvironmentConfig} from '../../../core/models/configuration.model';

@Component({
  selector: 'app-recaptcha2',
  imports: [
    NgxCaptchaModule,
    ReactiveFormsModule
  ],
  templateUrl: './recaptcha2.component.html',
  styleUrl: './recaptcha2.component.scss'
})
export class Recaptcha2Component {
  @Input() captchaControl: any;
  protected readonly environment: EnvironmentConfig = environment;
  protected readonly siteKey: string = environment.recaptcha.siteKey;
}
