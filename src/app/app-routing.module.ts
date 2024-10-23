import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberRegistrationComponent } from './member-registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'members', component: MemberRegistrationComponent },
  { path: 'members/:id', component: MemberRegistrationComponent } // Use the same component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
