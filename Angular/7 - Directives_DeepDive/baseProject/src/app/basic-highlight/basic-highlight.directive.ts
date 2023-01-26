import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]' // Nome unico para associar ao Dom do html, é aconcelhavel colocar entre []
})
export class BasicHighLightDirective implements OnInit{
    //É preciso ter acesso ao elemento que a directiva ira 
    //residir ao injectar o elemento que se pretende adicionar a directiva

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

}