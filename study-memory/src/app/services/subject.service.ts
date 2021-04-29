import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public user:User

  constructor(private angularFirestore:AngularFirestore, private authService:AuthService) { 
    this.user = new User()
    this.authService.user.subscribe((user:User)=>{
      this.user = user
    })
  }

  addSubject(subject:string){
    const subjectRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Subjects")
    subjectRef.add({
      subject:subject,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  getSubject(){
    const subjectRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Subjects")
    return subjectRef.valueChanges()
  }
}
