// questo componente serve a fare signout attraverso auth.service.ts
import { AuthService } from '../auth.service';
// importo Router per navigazione programmatica e inietto con dep inj
import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.signout().subscribe(() => {
      // Naviga verso pagina signin
      this.router.navigateByUrl('/');
    })
  }

}
