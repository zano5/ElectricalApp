import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  Services = [];
  Results:Boolean;
  UserName;
  UserID;
  UserArray = [];
  constructor(private router: Router) { }

  // The getUser is for checking the currently singned-in user
  getUser(url) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.router.navigateByUrl(url);
      } else {
        this.router.navigateByUrl('/sign-in');
      }
    });
  }

  logIn(email,password) {

    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      if (results) {
        this.UserID = results['user'].uid;
        // this.userDocumentNo = results['user'].uid;
        console.log("User id: " + this.UserID);
      }
      return results;
    }).catch((error) => {
      var errorCode = error.code;
      var errorCode = error.message;
      return errorCode;
    });
  }

  logOut() {
    return firebase.auth().signOut().then((results) => {
      // Sign-out successful.
      console.log(results);
      return results;
    }).catch((error) => {
      // An error happened.
      return error.message;
    });
  }


  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getUserProfile() {

    return firebase.firestore().collection("user/").get(this.UserID).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.UserArray.push(doc.data());
      })

      return this.UserArray;
    })
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
