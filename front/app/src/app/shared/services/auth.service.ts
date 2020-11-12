
import { User } from './user';
import { Router } from '@angular/router';

import firebase from 'firebase/app'

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
    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
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
                this.SetUserData(result.user);
            }).catch((err) => {
                window.alert(err.message)
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
                this.ngZone.run(() => {
                    this.router.navigate(['sign-in'])
                });

                result.user.updateProfile({
                    displayName: username
                })

                this.SetUserData(result.user);

            }).catch((err) => {
                window.alert(err.message);
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

                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
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

    /**
     *
     * @param user
     * @constructor
     */
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        }

        return userRef.set(userData, {
            merge: true
        })
    }
}
