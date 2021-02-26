import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { NotFoundComponent } from './not-found/not-found.component';
// importo il servizio resolver per email che asndrò a assegnare alla route :id
import { EmailResolverService } from './email-resolver.service'



const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    // se sono su /inbox mostrami il componente Placeholder -> <router-outlet></router-outlet> in home.component
    children: [
      { path: 'not-found', component: NotFoundComponent },
      { 
        // : cattura tutte le stringhe dopo / seguito dal parametro id
        path: ':id', 
        component: EmailShowComponent,
        // mi servono dati provenienti da EmailResolverService che Angular passerà al componente
        resolve: {
          email: EmailResolverService
        }
      },
      { path: '', component: PlaceholderComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
