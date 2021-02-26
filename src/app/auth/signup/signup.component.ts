import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// uso dependency injection per utilizzare la classe di validazione e router
// che poi passerò al costruttore
import { Router } from '@angular/router';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    // I arg: valore default
    // II arg validatori sync[]
    // III arg validatori async[] eseguti sempre dopo quelli sync
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],  [this.uniqueUsername.validate] ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, { validators: [this.matchpassword.validate] });

  constructor(
    private matchpassword: MatchPassword, 
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);
    // ritorna observable
    this.authService.signup(this.authForm.value).subscribe({
      // chiamato ogni volta che observable emette un value (chiamata http ritorna un valore)
      // se invoco next in questo modo this fa riferimento all'oggetto passato nella funzione subscribe,
      // uso arrow function per binding verso il componente
      // next(response) {
      //   console.log(this); 
      // },
      next: (response) => {
        // naviga verso un altra rotta
        this.router.navigateByUrl('/inbox');
      },
      // chiamato ogni volta che observable è completed (per chiamata http quando va a buon fine)
      // complete() {},
      // chiamato quando la richiesta non va a buon fine
      error: (err) => {
        if(!err.status) {
          // genero errore da stampare come per i validators
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  };
}
