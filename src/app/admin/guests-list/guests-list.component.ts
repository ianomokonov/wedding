import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Guest } from '../../models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGuestComponent } from '../add-guest/add-guest.component';



@Component({
  selector: 'guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.less']
})
export class GuestsListComponent implements OnInit {

  guestsList: Guest[]
  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.api.getGuests().subscribe(guest => {
      this.guestsList = guest;
      console.log(guest);
    })
  }

  public editGuest(id){
    this.modalService.open(AddGuestComponent, { centered: true, size: 'lg' })
  }

}

export class NgbdAccordionBasic { }
