import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.less']
})
export class EnterComponent implements OnInit {
  public enterForm: FormGroup;
  public show: boolean = false;
  constructor(private api: ApiService, private auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.enterForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.api.checkAccess().subscribe(isAdmin => {
      if(isAdmin){
        this.router.navigate(['/admin']);
        return;
      }
      this.show = true;
      sessionStorage.removeItem('weddingUserToken');
    },
    error => {
      this.show = true;
    })
    
  }

  public onEnterClick(): void {
    if (this.enterForm.invalid) {
      for (let [, value] of Object.entries(this.enterForm.controls)) {
        if (value.invalid) {
          value.markAsTouched();
        }
      }
      return;
    }
    const { login, password } = this.enterForm.getRawValue();
    this.api.enter(login, password).subscribe(token => {
      if (token) {
        this.auth.setToken(token);
        this.router.navigate(['/admin']);
      }
    },
      error => {
        console.log(error);
      });
  }

  public onBackClick(): void {
    window.history.back();
  }

}
