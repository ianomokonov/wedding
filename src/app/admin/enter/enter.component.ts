import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.less']
})
export class EnterComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  public onEnterClick(): void{
    // this.api.enter('login', 'password').subscribe(token => {
    //   this.auth.setToken(token);
    //   this.api.GetGuestInfoById(2).subscribe(guest => {
    //     console.log(guest);
    //   });
    // },
    // error => {
    //   console.log(error);
    // });
  }

}
