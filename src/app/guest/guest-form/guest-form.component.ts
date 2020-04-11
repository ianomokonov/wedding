import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Food } from 'src/app/models/food';
import { Alcohole } from 'src/app/models/alcohole';
import { Option, FoodOption, AlcoholeOption } from 'src/app/models/option';
import { ApiService } from 'src/app/services/api.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Guest } from 'src/app/models/guest';
import { GratitudeModalComponent } from '../gratitude-modal/gratitude-modal.component';

@Component({
  selector: 'guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.less']
})
export class GuestFormComponent implements OnInit {
  public foodOptions: FoodOption[] = [
    {
      type: Food.NoneFood,
      value: "Нет"
    },
    {
      type: Food.Meat,
      value: "Не ем мясо"
    },
    {
      type: Food.Fish,
      value: "Не ем рыбу"
    }
  ];
  public alcoholeOptions: AlcoholeOption[] = [
    {
      type: Alcohole.RedWine,
      value: "Красное вино"
    },
    {
      type: Alcohole.WhiteWine,
      value: "Белое вино"
    },
    {
      type: Alcohole.Champagne,
      value: "Шампанское"
    },
    {
      type: Alcohole.Whiskey,
      value: "Виски"
    },
    {
      type: Alcohole.Cognac,
      value: "Коньяк"
    },
    {
      type: Alcohole.Vodka,
      value: "Водка"
    },
    {
      type: Alcohole.NoneAlcohole,
      value: "Не буду пить алкоголь"
    }
  ];
  public guestForm: FormGroup;
  public otherFood: string;
  public guest: Guest;
  public guests: Guest[];
  constructor(private fb: FormBuilder, private api: ApiService, private configDropdown: NgbDropdownConfig, private modalService: NgbModal) {
    this.configDropdown.autoClose = "outside";
    this.initForm();
  }

  ngOnInit(): void {
    this.api.getGuestInfo().subscribe(guest => {
      this.guest = guest;
      this.api.getGuests().subscribe(guests => {
        this.guests = guests;
        this.guests.forEach((guest) => {
          this.addNeighbours('neighbours', guest.id)
        })
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
      children: new FormArray([
        this.fb.group({
          age: [null, Validators.required]
        })
      ]),
      neighbours: new FormArray([])
    })
  }

  getFormControls(form: string) {
    return (<FormArray>this.guestForm.get(form)).controls;
  }

  addChild(formControlName: string) {
    const formControl = (<FormArray>this.guestForm.get(formControlName));
    formControl.push(
      this.fb.group({
        age: [null, Validators.required]
      }))
  }

  removeControl(index: number, formName: string) {
    const form = (<FormArray>this.guestForm.get(formName));
    form.removeAt(index);

  }

  addNeighbours(formControlName: string, id) {
    const formControl = (<FormArray>this.guestForm.get(formControlName));
    formControl.push(
      this.fb.group({
        isChecked: [false],
        neighbourId: [id, Validators.required],
        guestId: [this.guest.id, Validators.required]
      }))
  }

  saveAnswer() {
    const form = this.guestForm.getRawValue();
    const filterCheck = form.neighbours.filter(item => item.isChecked);
    filterCheck.forEach(el => {
      delete el.isChecked;
    });
    form.neighbours = filterCheck;
    if (this.otherFood) {
      form.food = this.otherFood;
    }
    form.children.forEach(el => {
      el['guestId'] = this.guest.id;
    })
    delete form.hasChild;
    delete form.hasNeighbour;
    this.api.SaveAnswer(form).subscribe(() => {
      this.modalService.open(GratitudeModalComponent, { centered: true, size: 'lg' })
    });
    this.initForm();
    this.guests.forEach((guest) => {
      this.addNeighbours('neighbours', guest.id)
    })
  }
}