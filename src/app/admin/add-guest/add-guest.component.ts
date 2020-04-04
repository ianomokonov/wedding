import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.less']
})
export class AddGuestComponent implements OnInit {
  edit = false;
  constructor() { }
  
  ngOnInit(): void {
  }

}
