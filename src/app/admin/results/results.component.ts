import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Guest } from 'src/app/models/guest';
import { Food } from 'src/app/models/food';
import { alcoholeOptions, foodOptions } from 'src/app/guest/guest-form/options';
import { Alcohole } from 'src/app/models/alcohole';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less'],
})
export class ResultsComponent implements OnInit {
  guestsList: Guest[];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGuests().subscribe((guests) => {
      this.guestsList = guests;
    });
  }

  getFood(type: Food){
    return foodOptions.find(option => option.type == type)?.value || type;
  }

  getAlcohole(type: Alcohole){
    return alcoholeOptions.find(option => option.type == type)?.value || type;
  }
}
