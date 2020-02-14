import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {AngularFirestore} from '@angular/fire/firestore';
import { Router, RoutesRecognized } from '@angular/router';
import { map, filter, pairwise } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  array;
  writePost;
  Services = [];
  Results:Boolean;
  UserName;
  UserID;
  UserArray = [];
  erroMessage;

  USerIDArray = [];
  Person = [];

  firtName;
  lastName;
  

  URL;
  constructor(private router: Router,
    private afs : AngularFirestore,
    public afAuth: AngularFireAuth) {
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

  // logOut() {
  //   return firebase.auth().signOut().then((results) => {
  //     // Sign-out successful.
  //     console.log(results);
  //   }).catch((error) => {
  //     // An error happened.
  //   });
  // }

  
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/services');
    // this.router.navigate(['/']);
  }

  getUserProfile() {
    // this.UserID = firebase.auth().currentUser.uid;
    return this.afs.collection("user").doc(this.afAuth.auth.currentUser.uid).valueChanges();
    // var docRef = firebase.firestore().collection("user").doc("iJBFolJoORSamW141RcN26MlaKs2");
    // return docRef.get().then((doc) => {
    //   if(doc.exists){
    //     this.UserArray.push(doc.data());
    //   }else{}

    //   return this.UserArray;
    // }).catch((error) => {
    //   console.log("Error getting document:", error);
    // });

    // return new Observable((observer) => {
    //   docRef.get().then((doc) => {
    //     if(doc.exists){
    //       this.UserArray.push(doc.data());
    //     }else{}

    //     return this.UserArray;
    //   }).catch((error) => {
    //     console.log("Error getting document:", error);
    //   })
    // })
   
  }

  resetPassword(mail){
    this.afAuth.auth.sendPasswordResetEmail(mail).then((success) => {
      console.log(success);
      alert(success);
      this.router.navigateByUrl('sign-in');
    }).catch((err) => {
      console.log(err);
      alert(err);
    });
  
    }

    
  getUserName(email) {
    this.UserName = email;
  }

  addRequest(item : any){
    console.log(this.afAuth.auth.currentUser.uid)
    item.uid = this.afAuth.auth.currentUser.uid;
    this.writePost = this.afs.collection('user/').doc(this.afAuth.auth.currentUser.uid).collection('request');
    this.writePost.add(item).then(() =>{
            console.log(item);
            console.log("request added successful ..");
            console.log(item.stamp);
            alert("Transaction "+ item.refNo +" is currently being processed and Request was recieved succesfully ..");
            // console.log(item.description);
            this.router.navigateByUrl('tabs/notifications');
    
        });
}

viewRequest(){
      
  return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).collection('request').valueChanges();

}

//  gotUser(){
//   return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).valueChanges();
//  }

  addUser(user){

    console.log(user);
  
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.pass).then((error )=> {
      // Handle Errors here.
      console.log(error)
      // console.log(error.user.uid)
      user.uid = error.user.uid;
      user.pass = "";
    this.writePost = this.afs.collection<any>('user').doc(error.user.uid);
    this.writePost.set(user);
    
        alert(user.email + " succesful registered" );
        this.router.navigateByUrl('sign-in');
    });

  }

  getDoc(key: string){
    return this.afs.doc("services/"+key).valueChanges();
  }
  getICTDoc(key: string){
    return this.afs.doc("serviceICT/"+key).valueChanges();
  }

  getServiceICT(){

    return this.afs.collection('serviceICT/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  getService(){

    return this.afs.collection('services/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

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
  UpdateNames(Name,Surname) {
    // this.UserID = firebase.auth().currentUser.uid;
    return firebase.firestore().collection("user").doc(this.afAuth.auth.currentUser.uid).update({
      name: Name,
      surname: Surname
    })
  }

  UpdateEmail(Email) {
    firebase.firestore().collection("user/").doc(this.afAuth.auth.currentUser.uid).update({
      email: Email,
    })

    // return new Observable((observer) => {
    //   firebase.firestore().collection("user/").doc("iJBFolJoORSamW141RcN26MlaKs2").update({
    //     email: Email,
    //   })
    // })
  }

  UpdateNumber(Contacts) {
    return firebase.firestore().collection("user/").doc(this.afAuth.auth.currentUser.uid).update({
      email: Contacts,
    })
  }


  Clear() {
    this.UserArray.splice(0,1);
  }

  ////////////////////////////////////////////////////////////////////////
  getInfo(name, surname) {
    this.Person.push({
      Name: name,
      Surname: surname
    })
  }

  returnArray() {
    return this.Person;
  }
}
