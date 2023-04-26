import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LeaveDaysService } from 'src/app/services/leave-days.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private leaveDaysService: LeaveDaysService) { }
  events: any = []
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    weekends: true
  };

  ngOnInit(): void {
    this.leaveDaysService.getLeaveDaysByApplicationId(this.data.id).subscribe(data=>{
      for(let i = 0; i < data.length; i++){
        console.log(data[i]);
        this.events.push({title: "", date: data[i].leaveDate, color: '#0000FF'});
      }
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.events
      };
    })
  }

  
}
