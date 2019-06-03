import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value: any): Array<number> {
      if(!value)
          return value;
      return Object.keys(value).map(x=>Number(x)).filter(x=>!isNaN(x));
  }
}
