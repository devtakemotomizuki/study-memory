import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RecordAndDisplayComponent } from '../record-and-display/record-and-display.component';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.css']
})
export class SubjectDialogComponent implements OnInit {
  
  public subjects: Array<any> = new Array(0)
  private subjectRegExp = RegExp(/[^ 　]+/)
  public addSubject = new FormControl('', [Validators.required,Validators.pattern(this.subjectRegExp),this.checkSubject(this.subjects)])
  public addFlag: boolean = false
 
  constructor(public dialogRef: MatDialogRef<RecordAndDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) private injectSubjects: Array<any>) {
      for(let subject of this.injectSubjects){
        if(subject.deleted_at == null){
          this.subjects.push({
            subject: subject.subject,
            deleted: false,
            docID: subject.docID,
            modefy:false
          })
        }
      }
    }

  ngOnInit(): void {}

  onNoClick(): void {
    //ダイアログを閉じる
    this.dialogRef.close()
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  checkSubject(subjects: Array<any>):ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
      for(let subject of subjects){
        if(subject.subject == control.value){
          return {checkSubject: true}
        }
      }
      return null
    }
  }

  getSubjectErrorMessage() {
    //条件によって表示する文字列を変更する
    if (this.addSubject.hasError('required')) {
      return '文字を入力してください'
    }else if(this.addSubject.hasError('pattern')){
      return '科目名は空白以外で入力してください'
    }
    return this.addSubject.hasError('checkSubject') ? '重複する科目名は登録できません' : ''
  }

  pushSubject(subject:string){
    this.subjects.push({
        subject: subject,
        docID: "",
        deleted: false,
        modefy:false
      })
    this.addFlag = false
    this.addSubject.reset("")
  }

  deleteSubject(subject:string){
    for(let index = 0; index <  this.subjects.length; index++){
      if(this.subjects[index].subject==subject){
        this.subjects[index].deleted = true
      }
    }
  }

  modefySubject(subject:string){
    for(let index = 0; index <  this.subjects.length; index++){
      if(this.subjects[index].subject!=subject){
        this.subjects[index].modefy = false
      }
    }
  }
}
