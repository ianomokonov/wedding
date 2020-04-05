import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Guest } from 'src/app/models/guest';

@Component({
  selector: 'add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.less']
})
export class AddGuestComponent implements OnInit {
  public guest: Guest;
  set _guest(value){
    this.guest = value;
  }
  addGuest: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder) {
    
  }
  
  ngOnInit(): void {
    if(this.guest){
      this.addGuest = this.fb.group({
        id: [this.guest.id],
        name: [this.guest.name, [Validators.required]],
        surname: [this.guest.surname, [Validators.required]],
        secondname: [this.guest.secondName],
        transfer: [this.guest.transfer],
        link: [this.guest.link?.url],
        alcohole: [this.guest.alcohole],
        food: [this.guest.food],
        // children: [this.guest.children],
        // neighbours: [this.guest.neighbours],
        approved: [this.guest.approved],
      })
      console.log(this.guest);
    }
    else{
      this.addGuest = this.fb.group({
        name: [null, [Validators.required]],
        surname: [null, [Validators.required]],
        secondname: [null]
      })
    }
  }

  public onAddClick(): void {
    if (this.addGuest.invalid) {
      for (let [, value] of Object.entries(this.addGuest.controls)) {
        if (value.invalid) {
          value.markAsTouched();
        }
      }
      return;
    }
    console.log(this.addGuest.value);
    this.api.CreateGuest(this.addGuest.value).subscribe(id => {
      console.log(id);
    },
      error => {
        console.log(error);
      });
  }

  public onEditClick(): void{
    if (this.addGuest.invalid) {
      for (let [, value] of Object.entries(this.addGuest.controls)) {
        if (value.invalid) {
          value.markAsTouched();
        }
      }
      return;
    }
    console.log(this.addGuest.value);
    this.api.UpdateGuest(this.addGuest.value).subscribe(mess => {
      console.log(mess);
    },
      error => {
        console.log(error);
      });
  }
}
