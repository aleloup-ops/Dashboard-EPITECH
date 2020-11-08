import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public authService: AuthService) { }

  getErrorMessage () {
    if (this.email.hasError('required'))
      return 'You must enter a value';

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void { }
}
