import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>

  constructor(private angularFireAuth:AngularFireAuth,
  private router:Router) {
    this.user = this.angularFireAuth.authState
  }

  async signupWithEmailAndPassword(userName: string, email: string, password: string): Promise<void> {
    let auth = await this.angularFireAuth
    .createUserWithEmailAndPassword(email, password) // アカウント作成
    .catch(err => {
      console.log(err)
      alert('アカウントの作成に失敗しました。\n' + err);
      return null
    })

    if(auth!=null && auth.user != null){
      auth.user.updateProfile({
        displayName: userName
      })
      await auth.user.sendEmailVerification() // メールアドレス確認
      this.router.navigate(['/send-mail'])
    }
  }

  async loginWithEmailAndPassword(email: string, password: string){
    let credential = await this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      console.log(err) 
      alert("ログインに失敗しました")
      return null
    })

    if(credential != null && credential.user != null && !credential.user.emailVerified){
      this.angularFireAuth.signOut()
      return alert("メールアドレスが確認できていません")
    }
    return this.router.navigate(['/home'])
  }

  logout() {
    this.angularFireAuth.signOut()
      .then(() => {
        this.router.navigate(['/login'])
      })
  }

  googleLogin() {
    let provider = new firebase.default.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  private async oAuthLogin(provider:any) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then(credential => {
        console.log(credential.user)
        this.router.navigate(['/home'])
      })
      .catch(err => {
        console.log(err)
        alert("ログインに失敗しました")
      })
  }

  passwordForgot(email: string){
    this.angularFireAuth.sendPasswordResetEmail(email).then(() => {
      alert("メールを送信しました")
      this.router.navigate(['/login'])
    })
    .catch((err) => {
      console.log(err)
      alert("送信に失敗しました\n"+err.message)
    })
  }
  
}
