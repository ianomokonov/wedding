import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'wedding';

  constructor(private router: Router) { }

  @HostListener('document:keydown.control.m') doSth() {
    this.router.navigate(['/enter']);
  }
  @HostListener('document:keydown.control.ь') go() {
    this.router.navigate(['/enter']);
  }
}
