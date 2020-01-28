import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  Services = [];
  Results:Boolean;
  UserName;
  constructor(private router: Router) { }

  // The getUser is for checking the currently singed-in user
  getUser(url) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.router.navigateByUrl(url);
      } else {
      }
    });
  }

  getUserName(email) {
    this.UserName = email;
  }

  // The getServices method is for retrieving data from database
  getServices() {
    var db = firebase.firestore();
    return db.collection("services").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // console.log(doc.data())
          this.Services.push(doc.data())
      });

      return this.Services;
  });
  }
}
