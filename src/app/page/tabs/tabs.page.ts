import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(public TabService: AuthServiceService) { }

  ngOnInit() {
  }

}
