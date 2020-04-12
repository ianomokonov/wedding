import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let token = sessionStorage.getItem('weddingUserToken');
    if (token) {
      return this.api.checkAccess().pipe(
        tap((isAdmin) => {
          if (!isAdmin) {
            this.router.navigate(['enter']);
          }
        })
      );
    }

    return false;
  }
}
