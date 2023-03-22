import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReversePipe } from './pipe/reverse.pipe';
import { SortArrayPipe } from './pipe/sort-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    SortArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
