// RESOLVER: serve a far sì che non si abbiano dati non implementati nel template
import { Injectable } from '@angular/core';
// importo interfaccia Resolve per implemetare classe
// ActivatedRouteSnapshot mi serve a riprendere l'id dell'email (lo stato della url ad uno specifico momento)
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
// per la giusta implementazione dell'errore nel pipe per rxjs e typescript va ritornato un EMPTY (Observable che è marcato come complete)
// può essere ritornato ogni volta che non ci interessa cosa fare con questo bservable già complete
import { EMPTY } from 'rxjs';
// importo interfaccia tipo Email 
import { Email } from './email';
// importo EmailService per fetch alla mail
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }

  // ritorno da questo metodo oggetto di tipo Email
  // resolve accetta 2 params: I route del tipo snapshot dal quale riprendo id della mail (route.params.id) 
  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route)
    const { id } = route.params;

    // debbo ritornare o un oggetto dello stesso tipo Email:
    // return {
    //   id: 'dsfdsfds',
    //   subject: 'fsdfdsfds',
    //   to: 'dfdsfd',
    //   from: 'dfjhgeitu',
    //   text: 'fdgkjdflgd',
    //   html: 'dfdsjfsdifjds'
    // }
    // 
    // oppure un Observable che emette un Email (metodo getEmail del servizio EmailService)
    // in questo caso l'Observable che ritornerà sarà preso nel costruttore del componente email.show
    // se viene emesso errore con pipe lo catturo attraverso catchError operator
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
