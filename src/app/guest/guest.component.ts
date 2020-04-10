import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Guest } from '../models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprovedModalComponent } from './approved-modal/approved-modal.component';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.less']
})
export class GuestComponent {

  guest: Guest;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private api: ApiService, private modalService: NgbModal) {
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.auth.setToken(params['token']);
        this.getGuestInfo();
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  public onApproveClick() {
    this.api.ApproveComming(!this.guest.approved).subscribe(() => {
      
      if (!this.guest.approved) {
        this.modalService.open(ApprovedModalComponent, { centered: true, size: 'lg' })
      }
      this.guest.approved = !this.guest.approved;

    });
  }

  public goToApprove() {
    const approve = document.querySelector('.approve');
    approve.scrollIntoView({ behavior: 'smooth' });
  }

  private getGuestInfo() {
    this.api.getGuestInfo().subscribe(guest => {
      this.guest = guest;
      console.log(this.guest)
    },
      error => {
        this.router.navigate(['/']);
      })
  }

}
