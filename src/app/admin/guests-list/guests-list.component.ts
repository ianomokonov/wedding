import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Guest } from '../../models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGuestComponent } from '../add-guest/add-guest.component';
import { GenerateLinkRequest } from 'src/app/models/requests/GenerateLinkRequest';

@Component({
  selector: 'guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.less'],
})
export class GuestsListComponent implements OnInit {
  guestsList: Guest[];
  constructor(private api: ApiService, private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.api.getGuests().subscribe((guest) => {
      this.guestsList = guest;
    });
  }

  public addGuest(){
    const modalRef = this.modalService.open(AddGuestComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.guests = this.guestsList;
  }

  public editGuest(guest: Guest) {
    const modalRef = this.modalService.open(AddGuestComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.guest = guest;
  }

  public linkGenerate(guest: Guest) {

    // нужно указывать заголок тектом, а не автоматически. Сделать форму



    // const link = {
    //   guestId: id,
    //   header: 'Привет, ' + this.guestEdit.name + '!',
    // };
    // this.api.GenerateLink(this.link).subscribe((link) => {
    //   this.guestEdit.link = link;
    // });
  }
}

export class NgbdAccordionBasic {}
