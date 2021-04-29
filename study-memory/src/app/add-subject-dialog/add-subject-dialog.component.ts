import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RecordAndDisplayComponent } from '../record-and-display/record-and-display.component';

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.css']
})
export class AddSubjectDialogComponent implements OnInit {

  private subjectRegExp = RegExp(/[^ 　]+/)
  public subject = new FormControl('', [Validators.required,Validators.pattern(this.subjectRegExp),this.checkSubject(this.subjects)])


  constructor(public dialogRef: MatDialogRef<RecordAndDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public subjects: Array<any>) {
    }

  ngOnInit(): void {
  }

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
    if (this.subject.hasError('required')) {
      return '文字を入力してください'
    }else if(this.subject.hasError('pattern')){
      return '科目名は空白以外で入力してください'
    }
    return this.subject.hasError('checkSubject') ? '重複する科目名は登録できません' : ''
  }

}
