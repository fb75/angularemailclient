import { Component, OnInit } from '@angular/core';
// posso sfruttare varie informazioni (molte come BeahaviorSubjcet) conenute nell'oggetto (url params, ecc)
import { ActivatedRoute } from '@angular/router';
// switchMap ci permette di annullare chiamate network e sottoscriverci ad un altro Observable
import { switchMap } from 'rxjs/operators';
// importo servizio per emails
import { EmailService } from '../email.service';
// importo interfaccia per tipo Email
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(
    // le informazioni provenienti dal resolver si trovano dentro ActivatedRoute
    // o con Observable o Snapshot
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {
    // utilizzo del resolver con snapshot: attenzione perchè se cambio route i dati non si riaggiornano
    // console.log(this.route.snapshot.data);

    // utilizzo del resolver con Obsrevable: il resolver viene richiamato ogni volta che la route cambia
    // this.route.data.subscribe((data) => {
    //   console.log(data);
    // })

    // quindi posso subito accedere ad i dati da dentro il costruttore con snapshot ed assegnarli alla proprietà della classe:
    this.email = this.route.snapshot.data.email; 
    // sottoscrivermi agli aggiornamenti degli stessi con Observable:
    // assegnando alla proprietà email il dato proveninente dal servizio email resolver
    this.route.data.subscribe(({ email }) => {
      // console.log(email);
      this.email = email;
    });

  }

  ngOnInit() {
    // params essendo un BeahaviorSubject emette params ogni volta che cambia
    // esempio: posso estrarre parametro da url
      // this.route.params.subscribe(({ id }) => {
      //    ed invocare un metodo su un servizio con lo stesso
      //   // this.emailService.getEmail(id);
      // });
    // informazioni sulla route possono essere ricavate da:
    // Observable: emette valori ogni volta che route cambia
    // Snapshot: descrizione della route presa al momento 
    // rilascia oggetto senza chiavi con BeahviorSubjects ed Observable solo oggetti piani
    // se cambio route però il componente non essendo distrutto non posso più avere
    // info su di essa con snapshot pertanto non va usato se non per info momentanea della route

    // console.log(this.route.snapshot.params.id);

    // ogni volta che avrò un nuovo id restituito invocherò il servizio
    // in questo modo però potrebbero esserci problemi per quanto riguarda internet con connessioni lente
    
    // this.route.params.subscribe(({ id }) => { 
    //   console.log(id)
    //   this.emailService.getEmail(id).subscribe(email => console.log(email))
    // });

    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     // creo observable e lo ritorno
    //     return this.emailService.getEmail(id)
    //   })
    // ).subscribe(email => this.email = email)

    // usando i resolver tutto questo codice non mi serve più!

  }

  

}
