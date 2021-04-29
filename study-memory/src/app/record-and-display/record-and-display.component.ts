import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSubjectDialogComponent } from '../add-subject-dialog/add-subject-dialog.component';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-record-and-display',
  templateUrl: './record-and-display.component.html',
  styleUrls: ['./record-and-display.component.css']
})

export class RecordAndDisplayComponent implements OnInit {

  public dayOfWeekJP=[
    "日","月","火","水","木","金","土"
  ]

  public today:Date
  public user: User
  public subjects: any

  constructor(public authService:AuthService, public subjectService:SubjectService, public dialog: MatDialog) {
    this.today = new Date()
    this.user = new User()
    this.authService.user.subscribe((user:User)=>{
      this.user = user
      this.subjectService.getSubject().subscribe(docs=>{
        this.subjects = docs
      })
    })
    
   }

  ngOnInit(): void {
  }

  reload(){
    location.reload()
  }

  openDialog(): void {
    //ダイアログを起動
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      data: this.subjects
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result != null && result != ""){
         this.subjectService.addSubject(result)
      }
     
    　//ダイアログを閉じる
      console.log('The dialog was closed')
    });
  }

}
