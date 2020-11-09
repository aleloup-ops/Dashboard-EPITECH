import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl("assets/Google.svg")
    );
  }

  getErrorMessage () {
    if (this.email.hasError('required'))
      return 'You must enter a value';

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {}

}
