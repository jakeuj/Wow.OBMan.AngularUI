import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityEnums'
})
export class ActivityEnumsPipe implements PipeTransform {

  transform(value: any): any {
      switch (value) {
          case 1: return "PURCHASE";
          case 2: return "DIAMOND";
          case 3: return "PRIZE_WHEEL";
          case 4: return "UNDRESS";
          default:return value;
      }
  }
}
