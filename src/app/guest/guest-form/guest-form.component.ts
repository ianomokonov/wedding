import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Food } from 'src/app/models/food';
import { alcoholeOptions, foodOptions } from './options';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  public get alcohole(): FormArray {
    return this.guestForm.get('alcohole') as FormArray;
  }

  ngOnInit(): void {
    this.api.getGuestInfo().subscribe((guest) => {
      this.guest = guest;
      const formControl = <FormArray>this.guestForm.get('children');
      this.guest.children.forEach((child) => {
        formControl.push(
          this.fb.group({
            name: [child.name, Validators.required],
            age: [child.age, Validators.required],
          })
        );
      });
      const alcoholeControl = <FormArray>this.guestForm.get('alcohole');
      alcoholeOptions.forEach((drink) => {
        let d = this.guest.alcohole.find((o) => drink.type == o);
        if (drink.type === Alcohole.Other) {
          d = this.guest.alcohole.find((o) => !alcoholeOptions.find((option) => option.type == o));
          this.otherAlco = d;
        }

        alcoholeControl.push(
          this.fb.group({
            name: drink.value,
            value: drink.type,
            checked: !!d,
          })
        );
      });
      this.guestForm.patchValue(guest);
      if (this.guest.food.length > 1) {
        this.otherFood = this.guest.food;
        this.guestForm.get('food').setValue(Food.Other);
      }
      this.api.getGuests().subscribe((guests) => {
        this.guests = guests;
        this.guests.forEach((guest) => {
          this.addNeighbours(guest.id);
        });
      });
    });
  }

  initForm(): void {
    this.guestForm = this.fb.group({
      transfer: [null],
      food: [null],
      alcohole: new FormArray([]),
      hasChild: [null],
      hasNeighbour: [null],
      children: new FormArray([]),
      neighbours: new FormArray([]),
    });
  }

  getFormControls(form: string) {
    return (<FormArray>this.guestForm.get(form)).controls;
  }

  addChild() {
    const formControl = <FormArray>this.guestForm.get('children');
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
    if (form.value.length == 0) {
      this.guestForm.value.hasChild = false;
    }
  }

  addNeighbours(neighbourId) {
    const formControl = <FormArray>this.guestForm.get('neighbours');
    formControl.push(
      this.fb.group({
        isChecked: [this.guest.neighbours.find((item) => item.neighbourId == neighbourId)],
        neighbourId: [neighbourId, Validators.required],
        guestId: [this.guest.id, Validators.required],
      })
    );
  }

  saveAnswer() {
    if (this.guestForm.invalid) {
      for (let [, value] of Object.entries(this.guestForm.controls)) {
        if (value.invalid) {
          value.markAsTouched();
        }
      }
      return;
    }
    const form = this.guestForm.getRawValue();
    const filterCheck = form.neighbours.filter((item) => item.isChecked);
    filterCheck.forEach((el) => {
      delete el.isChecked;
    });
    form.neighbours = filterCheck;
    if (form.food == this.foodEnum.Other) {
      form.food = this.otherFood;
    }
    form.alcohole = form.alcohole.filter(alc => alc.checked).map(alc => {
      if (alc.value == this.alcoEnum.Other) {
        return {value: this.otherAlco};
      }
      return {value: alc.value};
    })
    
    form.children.forEach((el) => {
      el.guestId = this.guest.id;
    });
    if (!form.hasChild) {
      delete form.children;
    }
    if (!form.hasNeighbour) {
      delete form.neighbours;
    }
    delete form.hasChild;
    delete form.hasNeighbour;
    this.api.SaveAnswer(form).subscribe(() => {
      this.modalService.open(GratitudeModalComponent, { centered: true, size: 'lg' });
    });
  }
}
