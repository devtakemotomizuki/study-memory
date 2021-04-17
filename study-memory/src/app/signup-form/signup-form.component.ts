import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  private passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[!-~]{8,100}$/)

  public loginForm: FormGroup
  public userName = new FormControl('', [Validators.required])
  public email = new FormControl('', [Validators.required, Validators.email])
  public password = new FormControl('', [Validators.required,Validators.pattern(this.passwordRegExp)])
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
    //private auth: AuthService
  ) {
     //有効な文字列かどうか判定するための初期設定
    this.loginForm = this.formBuilder.group({
      userName:this.userName,
      email: this.email,
      password:this.password
    })
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

  async signupWithEmailAndPassword() {
    this.authService.signupWithEmailAndPassword(this.email.value,this.password.value)
  }

}
