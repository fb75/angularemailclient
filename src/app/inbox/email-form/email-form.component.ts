import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// reimportare sempre ReactiveForms in inbox.module!
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup;
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();
;
  constructor() { }

  // a differenza degli altri casi il form va inizializzato dopo che la proprietà email che ricevo in input
  // viene accettata e quindi in ngOnInit() (come da prassi e non nel costruttore)
  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      // se si usa modo oggetto con disabled Angular non processa questi dati 
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    });
  }

  onSubmit() {
    if(this.emailForm.invalid) return;
    // console.log(this.emailForm.value) // from: non c'è
    // console.log(this.emailForm.getRawValue()) // stampa anche con campi disabled

    // emetto evento fuori dal componente che ascolterà email.create e passerà ad email.service
    this.emailSubmit.emit(this.emailForm.value);
  }

}
