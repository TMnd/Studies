import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription!: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable = new Observable(observe => {
      let count=0;
      setInterval(() => {
        observe.next(count);
        if(count == 2) {
          observe.complete; //O observable fica completado e nao exite mais trabalho
        }
        if(count>3) {
          observe.error(new Error("message throw, bigger than 3"));
        }
        count++;
      }, 1000);
    });

  
    this.firstObsSubscription = customIntervalObservable.pipe(
      filter((data: any) => {
        return data>0;
      }),
      map(
        (data: any) => {
          return 'Round: ' + (data + 1);
        }
      )
    ).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log("completed"); //Cleanup oportunities.
    });
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }

}
