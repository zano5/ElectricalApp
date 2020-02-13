import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  Results:string;
  URL;
  constructor(public router: Router) {
    // this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized),
    // pairwise()).subscribe((events: RoutesRecognized[]) => {
    //   this.URL = events[0].urlAfterRedirects;
    // })
  }

  set setURL(url_address) {
    this.URL = url_address;
  }

  get getURL() {
    return this.URL;
  }

  // The getUser is for checking the currently singned-in user
  getUser(url) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.router.navigateByUrl(url);
        console.log(url);
      } else {
        if(this.URL == '/tabs/profile_logout'){
          this.router.navigateByUrl('/tabs/services');
        }else {
          this.router.navigateByUrl('/sign-in');
        }
      }
    });
}

}
