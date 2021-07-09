import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TimestampService } from 'src/app/services/timestamp.service';
import { TimestampDialogComponent } from 'src/app/timestamp-dialog/timestamp-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-record-calendar',
  templateUrl: './record-calendar.component.html',
  styleUrls: ['./record-calendar.component.css']
})
export class RecordCalendarComponent implements OnInit {

  public dayOfWeekJP=[
    "日","月","火","水","木","金","土"
  ]
  public monthOfYear=[
    "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"
  ]

  public today:Date = new Date()
  public selectedNumber:Number = 0
  public selectedMonth:Array<Date> = new Array(0)
  public selectMonthList:Array<[string,number]> = new Array(0)
  public timestampList:Array<any> = new Array(0)
  public subjects: Array<any> = new Array(0)

  constructor(public timestampService: TimestampService, private authService:AuthService,
  private subjectService: SubjectService, public dialog: MatDialog) { 
    this.getMonthList(this.today.getFullYear(), this.today.getMonth())
    this.getOneMonth(this.today.getFullYear(), this.today.getMonth())
    this.authService.user.subscribe(()=>{
      this.timestampService.getMonthTimeStamp((+this.selectedNumber))
      .subscribe(docs=>{
        this.timestampList = docs
        this.subjectService.getSubject().subscribe(docs=>{
          this.subjects = docs
        })
      })
    })
  }

ngOnInit(){}

selectedfunc(def:number){
    this.changeSelectedMonth(def)
    this.authService.user.subscribe(()=>{
      this.timestampService.getMonthTimeStamp((+this.selectedNumber))
      .subscribe(docs=>{
        this.timestampList = docs
      })
    })
  }

  getOneMonth(year:number,month:number){
    this.selectedMonth.length = 0
    for(let i=0; i < new Date(year, month + 1, 0).getDate(); i++){
      this.selectedMonth.push(new Date(year, month, i+1))
    }
  }

  getMonthList(year:number,month:number){
    for(let i=5; i>0; i--){
      let lastDate = new Date(year, month-i+1, 0)
      this.selectMonthList.push([String(lastDate.getFullYear())+"年"+this.monthOfYear[lastDate.getMonth()]+
      "1日〜"+this.monthOfYear[lastDate.getMonth()]+String(lastDate.getDate())+"日",-i])
    }
    for(let i=0; i<6; i++){
      let lastDate = new Date(year, month+i+1, 0)
      this.selectMonthList.push([String(lastDate.getFullYear())+"年"+this.monthOfYear[lastDate.getMonth()]+
      "1日〜"+this.monthOfYear[lastDate.getMonth()]+String(lastDate.getDate())+"日",i])
    }
  }

  changeMonthList(){
    this.selectMonthList[5] = this.selectMonthList[((+this.selectedNumber)-this.selectMonthList[5][1])+5]
    for(let i=5; i>0; i--){
      let lastDate = new Date(this.today.getFullYear(), this.today.getMonth()+(+this.selectedNumber)-i+1, 0)
      this.selectMonthList[5-i]=[String(lastDate.getFullYear())+"年"+this.monthOfYear[lastDate.getMonth()]+
      "1日〜"+this.monthOfYear[lastDate.getMonth()]+String(lastDate.getDate())+"日",-i+(+this.selectedNumber)]
    }
    for(let i=1; i<6; i++){
      let lastDate = new Date(this.today.getFullYear(), this.today.getMonth()+(+this.selectedNumber)+i+1, 0)
      this.selectMonthList[5+i]=[String(lastDate.getFullYear())+"年"+this.monthOfYear[lastDate.getMonth()]+
      "1日〜"+this.monthOfYear[lastDate.getMonth()]+String(lastDate.getDate())+"日",i+(+this.selectedNumber)]
    }
  }

  changeSelectedMonth(def:number){
    this.selectedNumber = (+this.selectedNumber) + def
    this.changeMonthList()
    this.getOneMonth(this.today.getFullYear(), this.today.getMonth() + (+this.selectedNumber))
  }

  getBgcolor(date:Date):string{
    if(this.today.getFullYear()==date.getFullYear() && this.today.getMonth()==date.getMonth() 
    && this.today.getDate()==date.getDate()){
      return "lightcyan"
    }else{
      return "white"
    }
  }

  getTimestampOfDay(date:Date){
    let timestampOfDay = new Array(0)
    for(let timestamp of this.timestampList){
      if(timestamp.start.toDate().getFullYear()==date.getFullYear() && timestamp.start.toDate().getMonth()==date.getMonth() && timestamp.start.toDate().getDate()==date.getDate()){
        timestampOfDay.push({
          docID: timestamp.docID,
          subject: timestamp.subject,
          start: timestamp.start!=null ?  timestamp.start.toDate() : null,
          end: timestamp.end!=null ?  timestamp.end.toDate() : null,
          memo: timestamp.memo
        })
      }
    }
    if(timestampOfDay.length != 0){
      return timestampOfDay.sort((n1,n2) => {
        if (n1.start > n2.start) {
            return 1;
        }
        if (n1.start < n2.start) {
            return -1;
        }
        return 0;
      })
    }
    timestampOfDay.push({
      docID: "",
      subject: "",
      start: null,
      end: null,
      memo: ""
    })
    return timestampOfDay
  }

  getDataBoxClass(index:number){
    if(index == 0){
      return "top-td"
    }
    return "none-border"
  }

  studyTimeOfDay(date:Date){
    let time = 0
    for(let timestamp of this.getTimestampOfDay(date)){
      if(timestamp.end != null){
        time += timestamp.end - timestamp.start 
      }
    } 
    if(time == 0){
      return ""
    }
    return ("0" + Math.floor(time/3600000)).slice(-2) + ":" + ("0" + Math.floor(time/60000)%60).slice(-2)
  }

  getSubject(subID:string){
    for(let subject of this.subjects){
      if(subject.docID == subID){
        return subject.subject
      }
    }
    return ""
  }

  modefyTimestamp(result:any){
    for(let timestamp of result.timestampOfDay){
      if(timestamp.deleted){
        if(timestamp.docID != ""){
          this.timestampService.deleteTimestamp(timestamp,result.date)
        }
      }else{
        if(timestamp.docID == ""){
          this.timestampService.addTimestamp(timestamp,result.date)
        }else{
          this.timestampService.updateTimestamp(timestamp,result.date)
        }
      }
    }
   
  }
    
  openTimestampDialog(timestampOfDay:any,date:Date): void {
    //ダイアログを起動
    const dialogRef = this.dialog.open(TimestampDialogComponent, {
      data: {timestampOfDay:timestampOfDay, date: date},
      minWidth: "800px"
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result != null){
        this.modefyTimestamp(result)
      }
    　//ダイアログを閉じる
      console.log('The dialog was closed')
    })
  }
}
