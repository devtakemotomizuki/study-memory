import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-calendar',
  templateUrl: './report-calendar.component.html',
  styleUrls: ['./report-calendar.component.css']
})
export class ReportCalendarComponent implements OnInit {

  public dayOfWeekJP=[
    "日","月","火","水","木","金","土"
  ]

  public today:Date
  public selectedMonth:Array<Date>
  //public monthList:Array<string>

  constructor() { 
    this.today = new Date()
    this.selectedMonth = new Array(0)
    for(let i=0; i < new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).getDate(); i++){
      this.selectedMonth.push(new Date(this.today.getFullYear(), this.today.getMonth(), i+1))
    }
    
  }

  ngOnInit(): void {
  }

}
