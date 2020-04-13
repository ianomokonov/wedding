import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Food } from 'src/app/models/food';
import { alcoholeOptions, foodOptions } from './options';
import { Option, FoodOption, AlcoholeOption } from 'src/app/models/option';
import { ApiService } from 'src/app/services/api.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Guest } from 'src/app/models/guest';
import { GratitudeModalComponent } from '../gratitude-modal/gratitude-modal.component';
import { Alcohole } from 'src/app/models/alcohole';

@Component({
  selector: 'guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.less'],
})
export class GuestFormComponent implements OnInit {
  public foodEnum = Food;
  public alcoEnum = Alcohole;
  public guestForm: FormGroup;
  public otherFood: string;
  public otherAlco: string;
  public guest: Guest;
  public guests: Guest[];
  public alcoholeOptions = alcoholeOptions;
  public foodOptions = foodOptions;
  constructor(private fb: FormBuilder, private api: ApiService, private modalService: NgbModal) {
    this.initForm();
  }

  ngOnInit(): void {
    this.api.getGuestInfo().subscribe((guest) => {
      this.guest = guest;
      this.guestForm.patchValue(guest);
      if(this.guest.food.length > 1){
        this.otherFood = this.guest.food;
        this.guestForm.get('food').setValue("3");
      }
      if(this.guest.alcohole.length > 1){
        this.otherAlco = this.guest.alcohole;
        this.guestForm.get('alcohole').setValue("7");
      }
      this.api.getGuests().subscribe((guests) => {
        this.guests = guests;
        this.guests.forEach((guest) => {
          this.addNeighbours('neighbours', guest.id);
        });
      });
    });
  }

  initForm(): void {
    this.guestForm = this.fb.group({
      transfer: [null],
      food: [null],
      alcohole: [null],
      hasChild: [null],
      hasNeighbour: [null],
      children: new FormArray([]),
      neighbours: new FormArray([]),
    });
  }

  getFormControls(form: string) {
    return (<FormArray>this.guestForm.get(form)).controls;
  }

  addChild(formControlName: string) {
    const formControl = <FormArray>this.guestForm.get(formControlName);
    formControl.push(
      this.fb.group({
        name: [null, Validators.required],
        age: [null, Validators.required],
      })
    );
  }

  removeControl(index: number, formName: string) {
    const form = <FormArray>this.guestForm.get(formName);
    form.removeAt(index);
  }

  addNeighbours(formControlName: string, neighbourId) {
    const formControl = <FormArray>this.guestForm.get(formControlName);
    formControl.push(
      this.fb.group({
        isChecked: [this.guest.neighbours.find(item => item.neighbourId == neighbourId)],
        neighbourId: [neighbourId, Validators.required],
        guestId: [this.guest.id, Validators.required],
      })
    );
  }

  saveAnswer() {
    if (this.guestForm.valid) {
      const form = this.guestForm.getRawValue();
      const filterCheck = form.neighbours.filter((item) => item.isChecked);
      filterCheck.forEach((el) => {
        delete el.isChecked;
      });
      form.neighbours = filterCheck;
      if (form.food == "3") {
        form.food = this.otherFood;
      }
      if (form.alcohole == "7") {
        form.alcohole = this.otherAlco;
      }
      form.children.forEach((el) => {
        el.guestId = this.guest.id;
        el.name = '';
      });
      if (!form.hasChild) {
        delete form.children;
      };
      if (!form.hasNeighbour) {
        delete form.neighbours;
      };
      delete form.hasChild;
      delete form.hasNeighbour;
      this.api.SaveAnswer(form).subscribe(() => {
        this.modalService.open(GratitudeModalComponent, { centered: true, size: 'lg' });
        this.guests.forEach((guest) => {
          this.addNeighbours('neighbours', guest.id);
        });
      });
    }
    else{
      return;
    }
  }
}
