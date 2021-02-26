// questa classe deve essere usata come dep inj in signup component:
import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

// uso il decoratore per dichiararla come tale e poterla usare come dep inj
@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;

    if(password === passwordConfirmation) {
      return null;
    } else {
      return { passwordDontMatch: true };
    }
  }
}

// ritornerà errore del tipo :
// authForm.errors === { passwordDontMatch: true }