import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Guest } from 'src/app/models/guest';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.less'],
})
export class AddGuestComponent {
  public localGuest: Guest;
  set guest(value: Guest) {
    this.localGuest = value;
    this.guestFrom.patchValue(this.guest);
  }
  get guest(): Guest {
    return this.localGuest;
  }
  public guests: Guest[];
  public guestFrom: FormGroup;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.guestFrom = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      secondname: [null],
      transfer: [null],
      alcohole: [null],
      food: [null],
      // children: [this.guest.children],
      // neighbours: [this.guest.neighbours],
      approved: [null],
    });
  }

  public onAddClick(): void {
    if (this.guestFrom.invalid) {
      this.setFormFieldsTouched();
      return;
    }

    const { name, surname, secondName } = this.guestFrom.getRawValue() as Guest;
    this.api.CreateGuest({ name, surname, secondName }).subscribe(
      (id) => {
        this.guests.push({ id, name, surname, secondName });
        this.modalService.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public onEditClick(): void {
    if (this.guestFrom.invalid) {
      this.setFormFieldsTouched();
      return;
    }
    const guest = this.guestFrom.getRawValue();
    this.api.UpdateGuest(guest).subscribe(
      (mess) => {
        Object.assign(this.guest, guest);
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private setFormFieldsTouched() {
    for (const [, value] of Object.entries(this.guestFrom.controls)) {
      if (value.invalid) {
        value.markAsTouched();
      }
    }
  }
}
