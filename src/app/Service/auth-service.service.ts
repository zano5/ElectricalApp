import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  array;
  writePost;
  Services = [];
  Results:Boolean;
  UserName;
  constructor(private router: Router,private afs : AngularFirestore,public afAuth: AngularFireAuth) { }

  // The getUser is for checking the currently singed-in user
  getUser(url) {
    console.log(url)
    return firebase.auth().onAuthStateChanged((user) => {
      // if (user) {
      //   // User is signed in
      //   this.router.navigateByUrl(url);
      // } else {
      // }
      console.log(user)
    });
   
  }

  getUserName(email) {
    this.UserName = email;
  }

  addUser(user){

    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.pass).then((error:any )=> {
      // Handle Errors here.
      console.log(error + " added user succesful");
      this.writePost = this.afs.collection<any>('user').doc(error.uid);
      this.writePost.add(user).then(() =>{

      });
        alert(user.email + " succesful registered" );

    });

  }

  getDoc(key: string){
    return this.afs.doc("services/"+key).valueChanges()
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
}
