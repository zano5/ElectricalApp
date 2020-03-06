import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {AngularFirestore} from '@angular/fire/firestore';
import { Router, RoutesRecognized } from '@angular/router';
import { map, filter, pairwise } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  array;
  writePost;
  writePost1;
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
  Ref = [];
  HistoryArray = [];
  PlumbingServices = [];

  Reserve = [];
  service_id;
  Reviews = [];
  constructor(private router: Router,
    private afs : AngularFirestore,
    public afAuth: AngularFireAuth) {
  }

  set setURL(url_address) {
    this.URL = url_address;
  }

  get getURL() {
    return this.URL;
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
    item.uid = this.afAuth.auth.currentUser.uid;
    this.writePost1 = this.afs.collection('request/').add(item);
    // this.writePost1.add(item);
    console.log(item)
    
    this.writePost = this.afs.collection('user/').doc(this.afAuth.auth.currentUser.uid).collection('request');
    this.writePost.add(item).then(() =>{
            console.log(item);
            console.log("request added successful ..");
            console.log(item.stamp);
            alert("Transaction "+ item.refNo +" is currently being processed and Request was recieved succesfully ..");
            // console.log(item.description);
            this.router.navigateByUrl('tabs/notifications');
            // this.router.navigate("tabs/notifications",{params : {}})
        });


    // this.afs.collection("newHistory").doc(this.afAuth.auth.currentUser.uid).set({
    //   item
    // })
    // .then(() => {
    //   console.log("Document successfully written!");
    // })
    // .catch((error) => {
    //   console.error("Error writing document: ", error);
    // });

    // this.router.navigateByUrl('/tabs/notifications');
       
}

ViewHistory() {
  return this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).collection('request').valueChanges();
}

viewRequest(){
      
  return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).collection('request',ref => ref.where('uid', '==' ,this.afAuth.auth.currentUser.uid) && ref.orderBy('stamp',"desc")).valueChanges();

}

set setRef(ref) {
  this.Ref = ref;
}

get getRef() {
  return this.Ref;
}

ViewAllRequests() {
  return this.afs.collection("request").valueChanges();
}

ViewHistoryDetails() {
  return this.afs.collection("user").doc(this.afAuth.auth.currentUser.uid).collection("request").valueChanges();

  // var db = firebase.firestore();
  //   return db.collection("user").doc(this.afAuth.auth.currentUser.uid).collection("request").get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if(this.Ref == doc.data().refNo){
  //         // this.HistoryArray.push(doc.data());
  //         console.log(doc.data().refNo);
  //       }else{
  //         console.log("false");
  //       }
  //     });

  //     return this.HistoryArray;
  // });
}

//  gotUser(){
//   return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).valueChanges();
//  }

  addUser(user,url){
    // console.log(user);

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.pass).then((results )=> {
      // Handle Errors here.
      console.log(results)
      // console.log(error.user.uid)
      user.uid = results.user.uid;
      user.pass = "";
    this.writePost = this.afs.collection<any>('user').doc(results.user.uid);
    this.writePost.set(user);
    
        alert(user.email + " succesful registered" );
        this.router.navigateByUrl(url);
    });

  }

  getDoc(key: string){
    return this.afs.doc("services/"+key).valueChanges();
  }

  getICTDoc(key: string){
    return this.afs.doc("serviceICT/"+key).valueChanges();
  }

  getPlumbingDoc(key: string){
    return this.afs.doc("servicesPlumbing/"+key).valueChanges();
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

  ////////////////Add reviews////////////////////////////
  //////////////////////////////////////////////////////

  set setServiceID(id) {
    this.service_id = id;
  }

  get getServiceID() {
    return this.service_id;
  }

  submitReviews(rate,comment,date) {
    
    this.afs.firestore.collection('reviews').add({
      date: date,
      rate: rate,
      comment: comment,
      uid: this.afAuth.auth.currentUser.uid,
      email: this.afAuth.auth.currentUser.email,
      serviceID: this.service_id,
    }).then((message) => {
      console.log("Comment made successfully");
    }).catch((error) => {
      console.log("Error detected: " + error);
    })
  }

  getReviews(key) {
    return this.afs.collection('reviews', ref => ref.where('serviceID', '==' , key)).valueChanges()

    // return this.afs.collection('reviews',ref => ref.where('uid', '==' , key) && ref.orderBy('stamp',"desc")).valueChanges();
  }
  //Adding comments
  //////////////////
  Comments(key,Comment, name, surname) {

    this.afs.firestore.collection('services/').doc(key).get().then((docSnapshot) => {
      if(docSnapshot.exists){
        return this.afs.collection('services/').doc(key).collection('comments').add({
          comment: Comment,
          uid: this.afAuth.auth.currentUser.uid,
          email: this.afAuth.auth.currentUser.email,
        }).then((data) => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        })
      }else{}
    })

    this.afs.firestore.collection('serviceICT/').doc(key).get().then((docSnapshot) => {
      if(docSnapshot.exists){
        return this.afs.collection('serviceICT/').doc(key).collection('comments').add({
          comment: Comment,
          uid: this.afAuth.auth.currentUser.uid,
          email: this.afAuth.auth.currentUser.email
          // name: 
        }).then((data) => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        })
      }else{}
    })

    this.afs.firestore.collection("servicesPlumbing/").doc(key).get().then((docSnapshot) => {
      if(docSnapshot.exists){
        return this.afs.collection('servicesPlumbing/').doc(key).collection('comments').add({
          comment: Comment,
          uid: this.afAuth.auth.currentUser.uid,
          email: this.afAuth.auth.currentUser.email
        }).then((data) => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        })
      }
    })
    // console.log("Return info: " + pen);
 
  }

  getComments(key) {
    return this.afs.collection('services/').doc(key).collection('comments').valueChanges();
  }

  getUserByID(key:string) {
    return this.afs.collection('user/').doc(key).valueChanges();
  }

  getMostRequested_Electrical_Services() {
    return this.afs.collection('services/', ref => ref.where('requestsMade', '>', 2).orderBy('requestsMade', 'desc')).valueChanges();
  }

  getMostRequested_ICT_Services() {
    return this.afs.collection('serviceICT/', ref => ref.where('requestsMade', '>', 2).orderBy('requestsMade', 'desc')).valueChanges();
  }

  getRequested_Plumbing_Services() {
    return this.afs.collection('servicePlumbing/', ref => ref.where('requestsMade', '>', 2).orderBy('requestsMade', 'desc')).valueChanges();
  }
  
  //////////////////////////////////////////
  /////////////////////////////////////////
  electricalUpdateCounter(key,count:number) {

    if(key != null){
      firebase.firestore().collection('services/').doc(key).get().then((doc) => {
        if(doc.exists){
          firebase.firestore().collection('services/').doc(key).update({
            requestsMade: count
          }).catch((error) => {
            console.log("Error message: " + error);
          })
        }else{}
      })

      firebase.firestore().collection('serviceICT/').doc(key).get().then((doc) => {
        if(doc.exists){
          firebase.firestore().collection('serviceICT/').doc(key).update({
            requestsMade: count
          }).catch((error) => {
            console.log("Error message: " + error);
          })
        }else{}
      })

      firebase.firestore().collection('servicePlumbing/').doc(key).get().then((doc) => {
        if(doc.exists){
          firebase.firestore().collection('servicePlumbing/').doc(key).update({
            requestsMade: count
          }).catch((error) => {
            console.log("Error message: " + error);
          })
        }else{}
      })
    }else{}
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

  getPlumbingServices() {
    return this.afs.collection('servicesPlumbing/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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

  getUser_Info() {
    return this.afs.collection('user/').doc(this.afAuth.auth.currentUser.uid).valueChanges();
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
