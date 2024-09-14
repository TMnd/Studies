import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    let outputValue = "";
    
    for(let i=0; i<value.length; i++) {
      outputValue = value[i] + outputValue;
    }

    return outputValue;
  }

}
