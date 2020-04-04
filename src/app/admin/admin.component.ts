import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.GenerateLink({guestId: 1, header: 'Првиет, Иван'}).subscribe(user => {
      console.log(user)
    })
  }

}
