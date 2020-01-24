import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  URL = "/sign-in"
  moreRequest = 'No';

  constructor(public requestService: AuthServiceService) { }

  ngOnInit() {
    this.requestService.getUser(this.URL);
  }


  submit(){

  }

}
