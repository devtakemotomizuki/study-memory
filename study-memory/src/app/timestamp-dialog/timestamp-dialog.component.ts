import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { SubjectService } from '../services/subject.service';
import { RecordCalendarComponent } from '../tab-item/record-calendar/record-calendar.component';

@Component({
  selector: 'app-timestamp-dialog',
  templateUrl: './timestamp-dialog.component.html',
  styleUrls: ['./timestamp-dialog.component.css']
})
export class TimestampDialogComponent implements OnInit {

  public dayOfWeekJP=[
    "日","月","火","水","木","金","土"
  ]
  public subjects: Array<any> = new Array(0)
  public timestampOfDay: Array<any> = new Array(0)
  public timestampOfDayAdded: Array<any> = new Array(0)
  private timeRegExpFull: RegExp = new RegExp(/^([0-9]|[01][0-9]|2[0-3]):([0-9]|[0-5][0-9])$/)
  private timeRegExpHour: RegExp = new RegExp(/^[0-9]:/)
  private timeRegExpMinit: RegExp = new RegExp(/:[0-9]$/)

  constructor(public dialogRef: MatDialogRef<RecordCalendarComponent>,
  @Inject(MAT_DIALOG_DATA) public timestampAndDate: any, private authService: AuthService,
  private subjectService: SubjectService, private datePipe: DatePipe) {
    this.authService.user.subscribe(()=>{
      this.subjectService.getSubject().subscribe(docs=>{
        this.subjects = docs
      })
    })
    for(let timestamp of this.timestampAndDate.timestampOfDay){
      this.timestampOfDay.push({
        docID: timestamp.docID,
        start: this.datePipe.transform(timestamp.start, "hh:mm"),
        end: this.datePipe.transform(timestamp.end, "hh:mm"),
        subject: timestamp.subject,
        memo: timestamp.memo,
        deleted: false
      })
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    //ダイアログを閉じる
    this.dialogRef.close()
  }

  addTimestampOfDay(){
    this.timestampOfDayAdded.push({
      docID: "",
      start: "",
      end: "",
      subject: "",
      memo: "",
      deleted: false
    })
  }

  changeTime(time:string):string{
    if(!this.timeRegExpFull.test(time)){
      return ""
    }else if(this.timeRegExpHour.test(time) && this.timeRegExpMinit.test(time)){
      return "0" + time.slice(0,2) + "0" + time[2]
    }else if(this.timeRegExpHour.test(time)){
      return "0" + time
    }else if(this.timeRegExpMinit.test(time)){
      return time.slice(0,3) + "0" + time[3]
    }else{
      return time
    }
  }

  checkTimeStamp(){
    let timestampAll = this.timestampOfDay.concat(this.timestampOfDayAdded)
    for(let timestamp of timestampAll){
      if(!timestamp.deleted && timestamp.start == ""){
        return false
      }
      if(!timestamp.deleted && !this.timeRegExpFull.test(timestamp.start)){
        return false
      }
    }
    return true
  }

  getErrorMessage():string{
    let timestampAll = this.timestampOfDay.concat(this.timestampOfDayAdded)
    for(let timestamp of timestampAll){
      if(!timestamp.deleted && timestamp.start == ""){
        return "開始時刻を正しく設定していないフィールドは無効です"
      }
      if(!timestamp.deleted && !this.timeRegExpFull.test(timestamp.start)){
        return "開始時刻を正しく設定していないフィールドは無効です"
      }
    }
    return ""
  }

  createResult(){
    return{
      date: this.timestampAndDate.date,
      timestampOfDay: this.timestampOfDay.concat(this.timestampOfDayAdded)
    }
   
  }

}
