import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  imports: [
    AsyncPipe
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
