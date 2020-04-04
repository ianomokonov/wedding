import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Guest } from '../models/guest';



@Component({
  selector: 'guests-table',
  templateUrl: './guests-table.component.html',
  styleUrls: ['./guests-table.component.less']
})
export class GuestsTableComponent implements OnInit {

  guest:Guest
  constructor(private api:ApiService) { }

  guestsList = [
    {
      id:1,
      name:"Иван",
      surname:"Волик",
      secondname:"Андреевич",
      transfer: true,
      linkId:2,
      alcohole: "Виски",
      food: "Всё равно",
      approved: true
  
      // link?: Link;
      // children?: Child[];
      // neighbours?: Neighbour[];
    },
    {
      id:2,
      name:"Иван",
      surname:"Петров",
      transfer: true,
      linkId:2,
      alcohole: "Виски",
      food: "Всё равно",
      approved: true
  
      // link?: Link;
      // children?: Child[];
      // neighbours?: Neighbour[];
    },
    {
      id:3,
      name:"Иван",
      surname:"Иванов",
      transfer: true,
      linkId:2,
      alcohole: "Виски",
      food: "Всё равно",
      approved: true
  
      // link?: Link;
      // children?: Child[];
      // neighbours?: Neighbour[];
    }
  ]
  ngOnInit(): void {
  }

}

export class NgbdAccordionBasic{ }
