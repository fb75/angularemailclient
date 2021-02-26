import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // possiamo sfruttare direttamente la proprietà che non è altro che
  // un observable al quale assegniamo un boolean, il valore sarà fornito direttamente da authService
  // nel template useremo una | async (async pipe) che si può usare sia per il resolve di Promise che per
  // il valore di ritorno di un observable, essa  riceve il valore emesso dalla proprietà sulla quale viene usata e 
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {})
  }
}
