import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {

  public user:User
 
  constructor(private angularFirestore:AngularFirestore, private authService:AuthService, private datePipe: DatePipe) {
    this.user = new User()
    this.authService.user.subscribe((user:User)=>{
      this.user = user
    })
  }

  getStampState(){
    let month:string = String(this.datePipe.transform(new Date(), "yyyy-MM"))
    let timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp",ref=>ref.where("end", "<=", null))
    let valueChange = timestampRef.valueChanges({ idField: "docID" })
    if(valueChange != null){
      return valueChange
    }
    month = String(this.datePipe.transform(new Date(new Date().getFullYear(),new Date().getMonth()-1,0), "yyyy-MM"))
    timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp",ref=>ref.where("end", "!=", "null"))
    return timestampRef.valueChanges({ idField: "docID"})
  }

  getMonthTimeStamp(number: number){
    let date = new Date(new Date().getFullYear(), new Date().getMonth()+number+1, 0)
    let month:string = String(this.datePipe.transform(date, "yyyy-MM"))
    const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp")
    return timestampRef.valueChanges({ idField: "docID"})
  }

  pushStartStamp(subject: string, memo: string){
    this.getStampState().pipe(first()).subscribe(docs=>{
      if(docs.length == 0){
        let month = this.datePipe.transform(new Date(), "yyyy-MM")
        if(month != null){
          const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp")
          timestampRef.add({
            start: new Date(),
            end: null,
            subject: subject,
            created_at: new Date(),
            updated_at: new Date(),
            memo: memo,
          })
        }
      }
    }) 
  }

  pushEndStamp(){
    this.getStampState().pipe(first()).subscribe(docs=>{
      let month = String(this.datePipe.transform(docs[0].start.toDate(), "yyyy-MM"))
      if(docs.length ==1){
        const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp").doc(docs[0].docID)
        timestampRef.valueChanges().pipe(first()).subscribe(timestamp=>{
          timestampRef.set({
            start: timestamp != undefined ? timestamp.start : null,
            end: new Date(),
            subject: timestamp != undefined ? timestamp.subject: null,
            created_at: timestamp != undefined ? timestamp.created_at : null,
            updated_at: new Date(),
            memo: timestamp != undefined ? timestamp.memo: null,
          })
        })
      }
    })
  }

  addTimestamp(timestamp:any, date: Date){
    let month = String(this.datePipe.transform(date, "yyyy-MM"))
    const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp")
    timestampRef.add({
      start: new Date(String(this.datePipe.transform(date, "yyyy/MM/dd ")) + timestamp.start),
      end: timestamp.end ? new Date(String(this.datePipe.transform(date, "yyyy/MM/dd ")) + timestamp.end) : "",
      subject: timestamp.subject,
      created_at: new Date(),
      updated_at: new Date(),
      memo: timestamp.memo
    })
  }

  updateTimestamp(timestamp: any, date: Date){
    let month = String(this.datePipe.transform(date, "yyyy-MM"))
    const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp").doc(timestamp.docID)
    timestampRef.valueChanges().pipe(first()).subscribe(doc=>{
      if(doc != null){
        timestampRef.set({
          start: new Date(String(this.datePipe.transform(date, "yyyy/MM/dd ")) + timestamp.start),
          end: timestamp.end ? new Date(String(this.datePipe.transform(date, "yyyy/MM/dd ")) + timestamp.end) : "",
          subject: timestamp.subject,
          created_at: doc.created_at,
          updated_at: new Date(),
          memo: timestamp.memo,
        })
      }
    })
  }

  deleteTimestamp(timestamp:any, date: Date){
    let month = String(this.datePipe.transform(date, "yyyy-MM"))
    const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month").doc(month).collection("TimeStamp").doc(timestamp.docID)
    timestampRef.delete()
  }
}
