import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': '1234567890asdfad'
    })

    const newRequest = request.clone({
      headers,
    })

    if (request.method === 'POST' || request.method === 'PUT') {
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
