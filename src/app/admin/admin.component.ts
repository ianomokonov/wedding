import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprovedModalComponent } from '../guest/approved-modal/approved-modal.component';
import { AddGuestComponent } from './add-guest/add-guest.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public addGuest(){
    this.modalService.open(AddGuestComponent, { centered: true, size: 'lg' })
  }
}
