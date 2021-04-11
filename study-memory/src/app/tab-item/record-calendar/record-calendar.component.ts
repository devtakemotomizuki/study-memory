import { Component, OnInit } from '@angular/core';

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

  public today:Date
  public selectedNumber:Number = 0
  public selectedMonth:Array<Date>
  public selectMonthList:Array<[string,number]>

  constructor() { 
    this.today = new Date()
    this.selectMonthList = new Array(0)
    this.selectedMonth = new Array(0)
    this.getMonthList(this.today.getFullYear(), this.today.getMonth())
    this.getOneMonth(this.today.getFullYear(), this.today.getMonth())
  }

  ngOnInit(): void {
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
  
}
