import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup
  public email = new FormControl('', [Validators.required, Validators.email])
  public password = new FormControl('', [Validators.required])

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

  getErrorMessage() {
    //条件によって表示する文字列を変更する
    if (this.email.hasError('required')) {
      return 'メールアドレスを入力してください'
    }

    return this.email.hasError('email') ? '有効なメールアドレスではありません' : ''
  }

  async login() {
  }

}
