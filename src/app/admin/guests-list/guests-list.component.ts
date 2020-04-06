import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Guest } from '../../models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGuestComponent } from '../add-guest/add-guest.component';
import { GenerateLinkRequest } from 'src/app/models/requests/GenerateLinkRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.less'],
})
export class GuestsListComponent implements OnInit {
  guestsList: Guest[];
  linkForm: FormGroup;
  genLink = false;
  constructor(private api: ApiService, private modalService: NgbModal, private fb: FormBuilder) {
    this.linkForm = this.fb.group({
      header:[null, Validators.required]
    })
  }

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
    const link = {
      guestId: guest.id,
      header: this.linkForm.value['header'],
    };
    this.api.GenerateLink(link).subscribe((link) => {
      guest.link = link;
    });
    this.genLink = false;
  }
}

export class NgbdAccordionBasic {}
