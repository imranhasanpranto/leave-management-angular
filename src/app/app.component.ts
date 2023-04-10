import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'leave-management';

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    
  }


}
