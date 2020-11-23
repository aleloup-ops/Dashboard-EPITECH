import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app';

    constructor (public authService: AuthService, public router: Router) { }

    /**
     * 
     */
    redirectHome () {
        if (this.authService.isLoggedIn === true)
            this.router.navigate(['dashboard']);
    }

    /**
     * 
     */
    logout () {
        this.authService.SignOut();
    }
}
