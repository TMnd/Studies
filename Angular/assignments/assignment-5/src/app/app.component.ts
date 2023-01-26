import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usersActive: string[] = [];
  usersInactive: string[] = [];

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ){ 
    this.counterService.contStatus.subscribe(
      (status: string) => {
        if (status === "inactive"){
          console.log(`${status}: ${this.counterService.contActiveToInactive}`);
        } else {
          console.log(`${status}: ${this.counterService.contInactiveToActive}`);
        }
      }
    );    
  }

  ngOnInit(): void {
    this.usersActive = this.usersService.activeUsers;
    this.usersInactive = this.usersService.inactiveUsers;
  }

}
