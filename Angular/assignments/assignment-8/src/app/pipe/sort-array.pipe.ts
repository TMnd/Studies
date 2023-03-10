import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArray'
})
export class SortArrayPipe implements PipeTransform {

  transform(
    value: {instanceType: string, name: string, status: string, started: Date}[], 
    propertyName: string
  ): {instanceType: string, name: string, status: string, started: Date}[] {
    if (value.length==0 || propertyName.length==0) {
      return value;
    }

    return value.sort((a, b) => (a[propertyName] > b[propertyName]) ? 1 : (a[propertyName] === b[propertyName]) ? ((a[propertyName] > b[propertyName]) ? 1 : -1) : -1 );
  }

}
