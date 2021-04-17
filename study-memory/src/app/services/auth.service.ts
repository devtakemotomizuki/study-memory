import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth:AngularFireAuth, private router:Router) { }

  async signupWithEmailAndPassword(email: string, password: string): Promise<void> {
    let auth = await this.angularFireAuth
    .createUserWithEmailAndPassword(email, password) // アカウント作成
    .catch(err => {
      console.log(err);
      alert('アカウントの作成に失敗しました。\n' + err);
      return null
    })

    if(auth!=null && auth.user != null){
      await auth.user.sendEmailVerification() // メールアドレス確認
      this.router.navigate(['/send-mail'])
    }
  }
  
}
