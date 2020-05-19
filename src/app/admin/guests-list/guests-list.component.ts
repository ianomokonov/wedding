import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Guest } from '../../models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGuestComponent } from './add-guest/add-guest.component';
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
  isEditting = false;
  firstItemTopOffset: number;
  shift = {
    left: 0,
    top: 0,
  };
  editableItem: HTMLDivElement;
  editableGuest: Guest;
  currentDropable: HTMLDivElement;
  position = {old: 0, newPosition: 0};
  items: HTMLDivElement[] = [];
  @ViewChild('list', { static: false }) list: ElementRef;
  constructor(private api: ApiService, private modalService: NgbModal, private fb: FormBuilder) {
    this.linkForm = this.fb.group({
      header: [null, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.api.getGuests().subscribe((guest) => {
      this.guestsList = guest;
    });
  }

  editList() {
    this.isEditting = !this.isEditting;
    if (this.isEditting) {
      this.list.nativeElement.addEventListener('pointerdown', this.onPoinerDown);
      document.querySelectorAll<HTMLDivElement>('.card').forEach((i) => {
        this.items.push(i);
      });
      return;
    }

    this.list.nativeElement.removeEventListener('pointerdown', this.onPoinerDown);
    this.items = [];
    
  }

  private onPoinerDown = ({ target, clientX, clientY }) => {
    const item: HTMLDivElement = target.closest('.card');
    if (!item) {
      return;
    }
    
    this.items = this.items.filter((i) => i != item);
    this.firstItemTopOffset = (this.list.nativeElement.querySelector('.card') as HTMLDivElement).getBoundingClientRect().top;
    this.position.old = Math.round((item.getBoundingClientRect().top + 63 - 50 - this.firstItemTopOffset) / 63);
    this.editableGuest = this.guestsList[this.position.old];
    this.shift.left = clientX - item.getBoundingClientRect().left;
    this.shift.top = clientY - item.getBoundingClientRect().top;
    item.style.width = item.offsetWidth + 'px';
    item.classList.add('position-fixed');
    item.style.zIndex = '1000';
    item.style.top = clientY - this.shift.top + 'px';
    item.style.left = clientX - this.shift.left + 'px';
    this.editableItem = item;

    document.addEventListener('pointermove', this.onPoinerMove);
    this.list.nativeElement.addEventListener('pointerup', this.onPoinerUp);
  };

  private onPoinerMove = ({ clientX, clientY }) => {
    if(clientY - this.shift.top - this.firstItemTopOffset - 6 < 6){
      return;
    }
    // if(clientY < 20){
    //   window.scrollBy(0, -50);
    //   this.firstItemTopOffset = (this.list.nativeElement.querySelector('.card') as HTMLDivElement).getBoundingClientRect().top;
    // }
    // if(window.innerHeight - clientY < 20){
    //   window.scrollBy(0, 50);
    //   this.firstItemTopOffset = (this.list.nativeElement.querySelector('.card') as HTMLDivElement).getBoundingClientRect().top;
    // }
    this.editableItem.style.top = clientY - this.shift.top + 'px';

    let elemBelow = document.elementFromPoint(clientX, clientY - this.shift.top - 1)  as HTMLDivElement;
    if(!elemBelow){
      return;
    }
    elemBelow = elemBelow.closest('.card') as HTMLDivElement;
    if(this.currentDropable){
      this.currentDropable.style.borderTop = '1px solid rgba(0,0,0,.125)';
    }
    
    if(elemBelow){
      elemBelow.style.borderTop = '5px solid #007bff';
      this.currentDropable = elemBelow;
    }
  };

  private onPoinerUp = ({ clientX, clientY }) => {
    document.removeEventListener('pointermove', this.onPoinerMove);
    document.removeEventListener('pointerup', this.onPoinerUp);
    const accordion = this.list.nativeElement.querySelector('ngb-accordion')
    if(this.currentDropable){
      accordion.insertBefore(this.editableItem, this.currentDropable);
      this.currentDropable.style.borderTop = '1px solid rgba(0,0,0,.125)';
    } else {
      accordion.append(this.editableItem);
    }
    
    this.editableItem.classList.remove('position-fixed');
    this.editableItem.style.zIndex = 'unset';
    this.editableItem.style.top = '0';
    this.editableItem.style.left = '0';
    this.position.newPosition = Math.round((this.editableItem.getBoundingClientRect().top + 63 - 50 - this.firstItemTopOffset) / 63);
    this.setNewPosition(this.position);
    this.currentDropable = null;
    document.removeEventListener('pointermove', this.onPoinerMove);
    this.list.nativeElement.removeEventListener('pointerup', this.onPoinerUp);

    
  };

  private setNewPosition({old, newPosition }){
    const t = this.guestsList[old];
    this.guestsList.splice(old, 1);
    this.guestsList = [...this.guestsList.slice(0, newPosition), t, ...this.guestsList.slice(newPosition, this.guestsList.length)];
    this.api.UpdatePositions(this.guestsList).subscribe((i) => {
      this.ngOnInit();
    })
  }

  public addGuest() {
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
    if (this.linkForm.invalid) {
      return;
    }
    const link = {
      guestId: guest.id,
      header: this.linkForm.getRawValue().header,
    };
    this.api.GenerateLink(link).subscribe((link) => {
      guest.link = link;
      guest['genLink'] = false;
      this.linkForm.reset();
    });
  }

  public removeLink(guest: Guest) {
    this.api.RemoveFromLink({ guestId: guest.id, linkId: guest.linkId }).subscribe(() => {
      this.ngOnInit();
    });
  }
}

export class NgbdAccordionBasic {}
