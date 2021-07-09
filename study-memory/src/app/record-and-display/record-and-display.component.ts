import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { SubjectService } from '../services/subject.service';
import { TimestampService } from '../services/timestamp.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { zip } from 'rxjs';

@Component({
  selector: 'app-record-and-display',
  templateUrl: './record-and-display.component.html',
  styleUrls: ['./record-and-display.component.css']
})

export class RecordAndDisplayComponent implements OnInit {

  public dayOfWeekJP=[
    "日","月","火","水","木","金","土"
  ]

  public today:Date = new Date()
  public user: User = new User()
  public subjects: Array<any> = new Array(0)
  public state: any
  public selectedSubject: string =  ""
  public memo:string = ""
  public stateFlag: boolean = true
  public overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  })

  constructor(public authService:AuthService, public subjectService:SubjectService, public dialog: MatDialog,
  public timestampService:TimestampService, private overlay: Overlay){
    this.overlayRef.attach(new ComponentPortal(MatSpinner))
    this.authService.user.subscribe((user:User)=>{
      this.user = user
      this.timestampService.getStampState().subscribe(docs=>{
        if(docs.length ==1){
          this.state = docs[0]
          this.stateFlag = false
        }
      })
      this.subjectService.getSubject().subscribe(subjects=>{
        this.subjects = subjects
      })
      zip(this.timestampService.getStampState(),this.subjectService.getSubject()).subscribe(()=>{
        this.overlayRef.detach()
      })
    })
   }

  ngOnInit(): void {}

  reload(){
    location.reload()
  }

  modefySubject(result:Array<any>){
    for(let subject of result){
      if(subject.deleted){
        if(subject.docID != ""){
          this.subjectService.deleteSubject(subject.docID)
        }
      }else{
        if(subject.docID == ""){
          this.subjectService.addSubject(subject.subject)
        }else{
          this.subjectService.updateSubject(subject.docID,subject.subject)
        }
      }
    }
  }

  openSubjectDialog(): void {
    //ダイアログを起動
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      data: this.subjects,
      width: "500px",
      maxWidth: "90%"
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result != null){
        this.modefySubject(result)
      }
     
    　//ダイアログを閉じる
      console.log('The dialog was closed')
    })
  }
}
