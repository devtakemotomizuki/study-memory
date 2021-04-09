import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.today = new Date()
   }

  ngOnInit(): void {
  }

}
