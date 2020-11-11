import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl("assets/Google.svg")
    );

    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl("assets/Github.svg"),
    );
  }

  getErrorMessage () {
    if (this.email.hasError('required'))
      return 'You must enter a value';

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void { }
}
