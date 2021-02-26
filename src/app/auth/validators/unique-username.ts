// potrei importare modulo http e attraverso la dep inj lo utilizzo nel costruttore dichiarandolo in @Injectable
// ma in realtà sfrutto un servizio per fare le chiamate Http e lo importo qui
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AsyncValidator, FormControl } from '@angular/forms';
// uso operatore map e catchError per catturare il risultato della post request
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {

  }
  // possiamo passare o referenza a fromGroup o formControl o tutto con AbstractControl
  // per poter avere il context del this usiamo arrow function
  validate = (control: FormControl) => { 
    const { value } = control;
  
    // valido l'osservabile generato da richiesta post su /username attraverso il servizio auth
    // passando value (l'input dell'utente passando per il formControl)
    return this.authService.usernameAvailable(value).pipe(
      map(value => {
        // se il check va a buon fine e quindi mi ritorna { available: true } non ritorno nulla
        if(value.available) return null;
      }),
      // se l'observable non entra in map (non ritorna l'oggetto sopra) gestisco l'errore con operatore catchError
      // ritorno un observable che emette un altro oggetto:
      // utilizzo operatore of (shortcut per creare nuovo observable) che emette observable con questo valore
      catchError(err => {
        if(err.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    )
  }
}
