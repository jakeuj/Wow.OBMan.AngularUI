import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityEnums'
})
export class ActivityEnumsPipe implements PipeTransform {

  transform(value: any, type?: string): string {
      if(!type || isNaN(Number(value)))
          return value;

      switch(type) {
          case 'CreateActivityDtoType':
          case 'ActivityDtoType':
              switch (value) {
                  case 1:
                      return "PURCHASE";
                  case 2:
                      return "DIAMOND";
                  case 3:
                      return "PRIZE_WHEEL";
                  case 4:
                      return "UNDRESS";
              }
              break;
          case 'CreateActivityDtoLeftTag':
          case 'ActivityDtoLeftTag':
              switch (value) {
                  case 0:
                      return "NONE";
                  case 1:
                      return "BUG";
                  case 2:
                      return "EVENT";
                  case 3:
                      return "GACHA";
                  case 4:
                      return "NOTICE";
                  case 5:
                      return "OTHERS";
              }
              break;
          case 'CreateActivityDtoRightTag':
          case 'ActivityDtoRightTag':
              switch (value) {
                  case 0:
                      return "NONE";
                  case 1:
                      return "NEW";
                  case 2:
                      return "TOP";
              }
              break;
      }
      return value;
  }
}
