import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ServerElement } from './server-element.modal';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, AfterContentInit{
  @Input('srvElement') element?: ServerElement;

  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef | undefined;

  constructor() {
    console.log('constructor called');
  }
  
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
    console.log('Text content of paragraph: ' + this.paragraph?.nativeElement.textContent)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Text content of paragraph: ' + this.paragraph?.nativeElement.textContent)
  }
}
