import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    if (!req.url.includes('enter.php') && sessionStorage.getItem('weddingUserToken')) {
        let token=sessionStorage.getItem('weddingUserToken');
        const paramReq = req.clone({
            params: req.params.set('token', token)
        });
        return next.handle(paramReq);
    } else {
        return next.handle(req);
    }
  }
}
