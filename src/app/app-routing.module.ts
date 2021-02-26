import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importo guard per lazy loading del modulo inbox (canLoad)

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'inbox',
    // possono esserci molteplici guards per l accesso al modulo per questo array
    canLoad: [AuthGuard],
    loadChildren: () => import('./inbox/inbox.module').then(mod => mod.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
