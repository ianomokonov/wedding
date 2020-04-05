import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Guest } from '../../models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGuestComponent } from '../add-guest/add-guest.component';
import { GenerateLinkRequest } from 'src/app/models/requests/GenerateLinkRequest';



@Component({
  selector: 'guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.less']
})
export class GuestsListComponent implements OnInit {
  link: GenerateLinkRequest;
  guestEdit: Guest;
  guestsList: Guest[];
  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.api.getGuests().subscribe(guest => {
      this.guestsList = guest;
      console.log(guest);
    })
  }

  public editGuest(id){
    this.guestsList.forEach(guest => {
      if(guest.id == id){
        this.guestEdit = guest;
      }
    });
    const modalRef = this.modalService.open(AddGuestComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance._guest = this.guestEdit;
  }

  public linkGenerate(id){
    this.guestsList.forEach(guest => {
      if(guest.id == id){
        this.guestEdit = guest;
      }
    });
    this.link = {
      guestId: id,
      header: "Привет, " + this.guestEdit.name + "!",
    }
    this.api.GenerateLink(this.link).subscribe(link => {
      this.guestEdit.link = link;
    })
  }
}

export class NgbdAccordionBasic { }
