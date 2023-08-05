import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';
import { BassketPageComponent } from './bassket-page/bassket-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'cart', component: BassketPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
