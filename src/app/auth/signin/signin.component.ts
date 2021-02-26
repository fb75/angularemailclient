import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl(
    '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl(
    '', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router  
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authForm.invalid) {
      return;
    }
    // passo oggetto a subscribe invece che funzione come in signup.component
    this.authService.signin(this.authForm.value).subscribe({
      next: () => {
        // navigazione programmatica 
        this.router.navigateByUrl('/inbox');
      },
      // destructuring su oggetto ritornato dall errore contenente proprietà error
      error: ({ error }) => {
        if(error.username || error.password) {
          // emetto errore nell'authForm
          this.authForm.setErrors({ credentials: true})
        }
      }
    })
  }
}
