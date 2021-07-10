import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
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
      updated_at: new Date(),
      deleted_at: null
    })
  }

  getSubject(){
    const subjectRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Subjects")
    return subjectRef.valueChanges({ idField: "docID" })
  }

  updateSubject(subID:string, subjectName:string){
    const subjectRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Subjects").doc(subID)
    subjectRef.valueChanges().subscribe(doc=>{
      if(doc != null && doc.subject != subjectName){
        subjectRef.set({
          subject: subjectName,
          created_at: doc != null ? doc.created_at : new Date(),
          updated_at: new Date(),
          deleted_at: null
        })
      }
    })
  }

  deleteSubject(subID:string){
    const subjectRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Subjects").doc(subID)
    subjectRef.valueChanges().pipe(first()).subscribe(doc=>{
      subjectRef.set({
        subject: doc != null ? doc.subject : "", 
        created_at: doc != null ? doc.created_at : new Date(),
        updated_at: doc != null ? doc.updated_at : new Date(),
        deleted_at: new Date()
      })
    })
  }
}
