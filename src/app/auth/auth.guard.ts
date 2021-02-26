import { Injectable } from '@angular/core';
import { 
  CanLoad, 
  Route, 
  UrlSegment, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree,
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // return new Observable(subscriber => {
    //   subscriber.next(true);
    //   // la guard aspetta che observable ritorni complete per andare a buon fine
    //   subscriber.complete(); 
    // });
    // la guard canLoad prevede il ritorno di un observable e finchè non risulta marcato come complete
    // Angular non riscontra il ritorno di nulla come se fossi in attesa di un valore, pertanto uso trick con 
    return this.authservice.signedin$.pipe(
      // salta i valori emessi dall observable che sono null in modo che non si sa se l'utente ha fatto signin o no
      skipWhile(value => value === null),
      // continua prendendo solo un valore in seguito e maschera come complete (take fa questo)
      take(1),
      tap((authenticated) => {
        if(!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
