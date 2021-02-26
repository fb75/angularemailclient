import { Component, OnInit } from '@angular/core';
// importo AuthService per conoscere l'username che ha eseguito signin, signup o per checkAuth
import { AuthService } from '../../auth/auth.service';
// importo EmailService per passare l'email da inviare tramite il suo metodo
import { EmailService } from '../email.service';
import { Email } from '../email';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  // popolo i campi del form 
  constructor(
    private authService: AuthService,
    private emailService: EmailService  
  ) { 
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-email.com`
    };
  }

  ngOnInit(): void {
  }

  onSubmit(email: Email) {
    // invio l email ricevuta da email.form con EmailService
    this.emailService.sendEmail(email).subscribe(() => {
      // se va a buon fine chiudo la modale
      this.showModal = false;
    });
  } 
}
