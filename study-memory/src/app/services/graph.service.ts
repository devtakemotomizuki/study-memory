import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  user: User = new User()
  barChartLabelsDate: Label[] = new Array(31)
  barChartDataDate: ChartDataSets[] = [
  {data: [], label: '日別勉強時間' }
  ]

  public correntDateCount = 0
  public chartDataMap = new Map()

  constructor(private angularFirestore:AngularFirestore, private authService:AuthService, private datePipe: DatePipe) {
    this.barChartLabelsDate = this.getchartLabel()
    this.authService.user.subscribe((user:User)=>{
      this.user = user
      this.getDateDict()
      this.getStudyTimeDateInit()
    })
  }

  getMonthList(month:string){
    let monthList = new Array(0)
    var date = new Date(month)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    for(let i=0;i<date.getDate();i++){
      monthList.push(0)
    }
    return monthList
  }

  getStudyTimeDateInit(){
    this.barChartDataDate[0].data = new Array(31)
    for(let i = 0; i < 31; i++){
      this.barChartDataDate[0].data[i] = 0
    }
    for(let i = 0; i < 31; i++){
      let targetDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-i)
      let month =  String(this.datePipe.transform(targetDate, "yyyy-MM"))
      if(typeof(month) == "string"){
        const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month")
        timestampRef.doc(month).collection("TimeStamp").valueChanges().subscribe((timestamps)=>{
          let sum = 0
          timestamps.forEach((time)=>{
            if(time.start.toDate().getDate()==targetDate.getDate()){
              if(time.start != null && time.end != null){
                sum += (time.end - time.start)/3600
              }
            }
          })
          if(typeof(this.barChartDataDate[0].data) != "undefined"){
            this.barChartDataDate[0].data[30-i] = sum
          }
        })
      }
    }
  }

  getDateDict(){
    const timestampRef = this.angularFirestore.collection("Users").doc(this.user.uid).collection("Month",ref=>ref.orderBy("month","desc"))
    timestampRef.valueChanges({ idField: "docID" }).subscribe(months=>{
      months.forEach((month)=>{
        timestampRef.doc(month.docID).collection("TimeStamp",ref=>ref.orderBy("start")).valueChanges().subscribe((timestamps)=>{
          let chartData = this.getMonthList(month.month)
          timestamps.forEach((time)=>{
            if(time.start != null && time.end != null){
              let date = Number(time.start.toDate().getDate())
              chartData[date-1] += (time.end - time.start)/3600
            }
          })
          this.chartDataMap.set(month.month,chartData)
        })
      })
    })
  }

  getchartLabel(){
    let label = new Array(31)
    for(let i = 0; i< 31; i++){
      label[30-i] =  String(this.datePipe.transform(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-this.correntDateCount-i), "MM/dd"))
    }
    return label
  }

  getStudyTimeDate(){
    let chartData = new Array(31)
    for(let i = 0; i < 31; i++){
      chartData[i] = 0
    }
    for(let i = 0; i < 31; i++){
      let targetDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-this.correntDateCount-i)
      let month =  String(this.datePipe.transform(targetDate, "yyyy-MM"))
      if(typeof(month) == "string"){
        
        if(this.chartDataMap.has(month)){
          chartData[30-i] = this.chartDataMap.get(month)[targetDate.getDate()-1]
          
        }else{
          chartData[30-i] = 0
        }   
      }
    }
    return chartData
  }

}
