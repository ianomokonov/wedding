import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Guest } from '../models/guest';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.less']
})
export class GuestComponent {

  guest: Guest;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private api:ApiService) {
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.auth.setToken(params['token']);
        this.getGuestInfo();
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  private getGuestInfo(){
    this.api.getGuestInfo().subscribe(guest => {
      this.guest = guest;
    })
  }

}
