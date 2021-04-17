import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterSendMailComponent } from './after-send-mail/after-send-mail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecordAndDisplayComponent } from './record-and-display/record-and-display.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  { path: 'home', component: RecordAndDisplayComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'send-mail', component: AfterSendMailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
