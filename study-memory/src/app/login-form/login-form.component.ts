import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[!-~]{8,100}$/)

  public loginForm: FormGroup
  public email = new FormControl('', [Validators.required, Validators.email])
  public password = new FormControl('', [Validators.required,Validators.pattern(this.passwordRegExp)])

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    //private auth: AuthService
  ) {
     //有効な文字列かどうか判定するための初期設定
     this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    //条件によって表示する文字列を変更する
    if (this.email.hasError('required')) {
      return '必須項目です'
    }

    return this.email.hasError('email') ? '有効なメールアドレスではありません' : ''
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return '必須項目です'
    }

    return this.password.hasError('pattern') ? '半角で英大文字、英小文字、数字を含み8字以上で作成してください' : ''
  }

  async login() {
  }

}
