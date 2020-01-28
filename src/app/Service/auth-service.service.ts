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
  // "iJBFolJoORSamW141RcN26MlaKs2"
  UserArray = [];

  erroMessage;
  constructor(private router: Router) { }

  // The getUser is for checking the currently singned-in user
  getUser(url) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // this.UserID = user.uid;
        this.router.navigateByUrl(url);
      } else {
        this.router.navigateByUrl('/sign-in');
      }
    });
  }

  logIn(email,password) {

    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      if (results) {
        // this.UserID = results['user'].uid;
        // this.userDocumentNo = results['user'].uid;
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
    this.UserID = firebase.auth().currentUser.uid;
    var docRef = firebase.firestore().collection("user").doc(this.UserID);
    return docRef.get().then((doc) => {
      if(doc.exists){
        this.UserArray.push(doc.data());
      }else{}

      return this.UserArray;
    }).catch((error) => {
      console.log("Error getting document:", error);
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  UpdateNames(Name,Surname) {
    this.UserID = firebase.auth().currentUser.uid;
    firebase.firestore().collection("user/").doc(this.UserID).update({
      name: Name,
      surname: Surname
    })
  }

  UpdateEmail(Email) {
    this.UserID = firebase.auth().currentUser.uid;
    firebase.firestore().collection("user/").doc(this.UserID).update({
      email: Email,
    })
  }

  UpdateNumber(Contacts) {
    this.UserID = firebase.auth().currentUser.uid;
    firebase.firestore().collection("user/").doc(this.UserID).update({
      email: Contacts,
    })
  }

}
