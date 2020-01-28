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

  addRequest(item : any){
    console.log(this.afAuth.auth.currentUser.uid)
    item.uid = this.afAuth.auth.currentUser.uid;
    this.writePost = this.afs.collection('user/').doc(this.afAuth.auth.currentUser.uid).collection('request');
    this.writePost.add(item).then(() =>{
            console.log(item);
            console.log("request added successful ..");
            console.log(item.stamp);
            // console.log(item.description);
            // this.router.navigateByUrl('tab/request');
    
        });
}
viewRequest(){
      
  return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).collection('request').valueChanges();

}

 gotUser(){
  return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).valueChanges();
 }

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
