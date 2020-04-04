import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Guest } from '../../models/guest';



@Component({
  selector: 'guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.less']
})
export class GuestsListComponent implements OnInit {

  guest: Guest
  constructor(private api: ApiService) { }

  public guestsList: Guest[] = [
    {
      id: 1,
      name: "Иван",
      surname: "Волик",
      secondName: "Андреевич",
      transfer: true,
      linkId: 2,
      alcohole: "Виски",
      food: "Всё равно",
      approved: true

      // link?: Link;
      // children?: Child[];
      // neighbours?: Neighbour[];
    },
    {
      id: 2,
      name: "Иван",
      surname: "Петров",
      transfer: true,
      linkId: 2,
      alcohole: "Виски",
      food: "Всё равно",
      approved: true

      // link?: Link;
      // children?: Child[];
      // neighbours?: Neighbour[];
    },
    {
      id: 3,
      name: "Иван",
      surname: "Иванов",
      transfer: true,
      linkId: 2,
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

export class NgbdAccordionBasic { }
