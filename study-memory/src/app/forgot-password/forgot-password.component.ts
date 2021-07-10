import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email])

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  passwordForgot(){
    this.auth.passwordForgot(this.email.value)
  }

  getEmailErrorMessage() {
    //条件によって表示する文字列を変更する
    if (this.email.hasError('required')) {
      return '必須項目です'
    }
    return this.email.hasError('email') ? '有効なメールアドレスではありません' : ''
  }

}
