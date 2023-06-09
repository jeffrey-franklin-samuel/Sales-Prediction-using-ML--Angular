import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
            if (user) {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    loginUser(email: string, password: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Auth Service: loginUser: success');
          // this.router.navigate(['/dashboard']);
          return { isValid: true }; // Return a value in the success case
        })
        .catch(error => {
          console.log('Auth Service: login error...');
          console.log('error code', error.code);
          console.log('error', error);
          if (error.code)
            return { isValid: false, message: error.message };
          return { isValid: false, message: 'Unexpected error occurred.' }; // Return a value in the error case
        });
    }

    signupUser(user: any): Promise<any> {
      return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          let emailLower = user.email.toLowerCase();
          if (result.user) {
            result.user.sendEmailVerification(); // immediately send the user a verification email
            return { isValid: true }; // Return a value in the success case
          } else {
            throw new Error('User creation failed.'); // Throw an error if the user object is null
          }
        })
        .catch(error => {
          console.log('Auth Service: signup error', error);
          if (error.code)
            return { isValid: false, message: error.message };
          return { isValid: false, message: 'Unexpected error occurred.' }; // Return a value in the error case
        });
    }


}
