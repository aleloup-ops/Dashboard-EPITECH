
import { User } from './user';
import { Router } from '@angular/router';

import firebase from 'firebase/app'

import { UserService } from './user.service'

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    userData: any;

    /**
     *
     * @param afs
     * @param afAuth
     * @param router
     * @param ngZone
     */
    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone, private _userService: UserService) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;

                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);

                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    /**
     *
     * @param email
     * @param password
     * @constructor
     */
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard'])
                });

                this._userService.createOrUpdate({
                    'uid': result.user.uid,
                    'email': result.user.email,
                    'displayName': result.user.displayName,
                })

            }).catch((err) => {
        })
    }

    /**
     *
     * @param email
     * @param password
     * @constructor
     */
    SignUp(email, password, username) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {

                result.user.updateProfile({
                    displayName: username
                })

                this._userService.createOrUpdate({
                    'uid': result.user.uid,
                    'email': result.user.email,
                    'displayName': username,
                })

                this.router.navigate(['sign-in'])

            }).catch((err) => {
        })
    }

    /**
     * 
     */
    get isLoggedIn(): Boolean {
        const user = JSON.parse(localStorage.getItem('user'));

        return user !== null;
    }

    // -------------------------- AUTH ---------------------------------------

    /**
     *
     * @constructor
     */
    GoogleAuth () {
        this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }

    /**
     * 
     */
    GithubAuth () {
        this.AuthLogin(new firebase.auth.GithubAuthProvider());
    }

    /**
     * 
     */
    TwitterAuth () {
        this.AuthLogin(new firebase.auth.TwitterAuthProvider());
    }

    /**
     * 
     */
    FacebookAuth () {
        this.AuthLogin(new firebase.auth.FacebookAuthProvider());
    }

    // --------------------------- LINK ---------------------------------------------

    /**
     * link Google account to the current login account.
     */
    linkGoogleAuth () {
        this.linkAccount(new firebase.auth.GoogleAuthProvider());
    }

    /**
     * link Facebook account to the current login account.
     */
    linkFacebookAuth () {
        this.linkAccount(new firebase.auth.FacebookAuthProvider());
    }

    /**
     * link Twitter account to the current login account.
     */
    linkTwitterAuth () {
        this.linkAccount(new firebase.auth.TwitterAuthProvider());
    }

    /**
     * link Github account to the current login account.
     */
    linkGithubAuth () {
        this.linkAccount(new firebase.auth.GithubAuthProvider());
    }

    /**
     * 
     * @param provider 
     */
    linkAccount (provider) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                user.linkWithPopup(provider).then(function (result) {

                }).catch (err => {
                    window.alert(err);
                })
            }
        })
    }

    /**
     *
     * @param provider
     * @constructor
     */
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                })

                if (result.credential.signInMethod === "twitter.com") {

                    this._userService.createOrUpdate({
                        'uid': result.user.uid,
                        'email': result.user.email,
                        'displayName': result.user.displayName,

                        'credential': {
                            'accessToken': result.credential['accessToken'],
                            'secret': result.credential['secret'],
                        }
                    })

                } else {
                    this._userService.createOrUpdate({
                        'uid': result.user.uid,
                        'email': result.user.email,
                        'displayName': result.user.displayName,
                    })
                }

            }).catch((error) => {
                console.log(error);
        })
    }

    /**
     *
     * @constructor
     */
    SignOut () {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');

            this.router.navigate(['sign-in']);
        })
    }
}
