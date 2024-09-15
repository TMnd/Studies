import {Component, Inject} from '@angular/core';
import { AuthLibService } from 'auth-lib';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.css']
})
export class FlightsSearchComponent {

  private service = Inject(AuthLibService);

  // Add this:
  user = this.service.user;

  // And add that:
  constructor() { }

  search(): void {
    alert('Not implemented for this demo!');
  }

  terms(): void {
    alert('Not implemented for this demo!');
  }

}
