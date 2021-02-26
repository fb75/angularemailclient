import { Injectable } from '@angular/core';
// uso questo servizio solo per eseguire chiamate alla API 
// poi 
import { HttpClient } from '@angular/common/http';
// utilizzo BeahaviourSubject per emettere valori dall'esterno 
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // questa proprietà è un observable con valore di default
  signedin$ = new BehaviorSubject(null);
  // una volta ricevuto il valore dalla API aggiornerò questa proprietà per passarla in seguito a email-create  
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    // il ritorno è un oggetto tipizzato come da interfaccia
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    });
  }

  // riceve valori dal form, importo in signup component
  signup(credentials: SignupCredentials) {
    // se la risposta va a buon fine va emesso un altro observable da signin$ con valore true
    // utilizzo III arg fa sì che la chiamata rispetti gli headers ed i cookies rimandati dal server
    return this.http
    .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
    .pipe(
      // restituisce un observable identico eseguendo effetti 
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  // controllo se l utente è autenticato mandando una richiesta get a auth/signedin
  // passandolo a ngOnInit in appcomponent.ts
  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        // observable emesso restituisce oggetto come da interfaccia SignedinResponse
        // ad ogni avvio dell app controllo il valore della proprietà e lo ripasso 
        // all behaviorSubject signedin$ per mantenere al refresh il valore (signedin true o false)
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      )
  }

  // il server rimanda cookie vuoto e posso assegnare dopo la risposta a buon fine un valore
  // al behaviourSubject 
  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
    .pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }
}
