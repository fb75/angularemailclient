import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable()
// implements serve a rispettare i tipi di dato che mi aspetto da HttpInterceptor
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler):
    Observable<HttpEvent<any>> {
      // modifico oggetto req in uscita
      const modifiedReq = req.clone({
        withCredentials: true
      });
      // ritorna observable che emette dei valori: oggetto response e
      return next.handle(modifiedReq);
        // posso guardare eventi relativi alla request usando pipe sull'observable
        // .pipe(
        //   // filtro direttamente l oggetto emesso dall observable
        //   filter(value => value.type === HttpEventType.Sent),
        //   tap(value => {
        //     console.log('Sent the request.');
        //     // se l oggetto evento che proviene dall observable ci conferma che ha raggiunto il server 
        //     // if(value.type === HttpEventType.Sent) {
        //     //   console.log('request is sent to server')
        //     // }
        //     // if(value.type === HttpEventType.Response) {
        //     //   console.log('Got a resposne from the API', value);
        //     // }
        //   })
        // )
  }
}

