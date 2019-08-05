import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityEnums'
})
export class ActivityEnumsPipe implements PipeTransform {

  transform(value: any, type: string): string {
      if(!type || isNaN(Number(value)))
          return value;

      switch(type) {
          case 'CreateActivityDtoType':
          case 'ActivityDtoType':
              switch (value) {
                  case 0:
                      return "NONE";
                  case 1:
                      return "PURCHASE";
                  case 2:
                      return "DIAMOND";
                  case 3:
                      return "PRIZE_WHEEL";
                  case 4:
                      return "UNDRESS";
                  case 5:
                      return "TinyGame";
                  case 6:
                      return "Brand";
                  case 7:
                      return "Lottery";
                  case 8:
                      return "LeaderBoard";
                  case 9:
                      return "PiggyBank";
                  case 10:
                      return "Invest";
                  case 11:
                      return "BattlePass";
                  case 12:
                      return "Slot";
              }
              break;
          case 'CreateActivityDtoLeftTag':
          case 'ActivityDtoLeftTag':
              switch (value) {
                  case 0:
                      return "NONE";
                  case 1:
                      return "NEW";
                  case 2:
                      return "LIMIT";
                  case 3:
                      return "HOT";
                  case 4:
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
          case 'ItemType':
              switch (value) {
                  case 0:
                      return "NONE";
                  case 1:
                      return "FreeDiamond";
                  case 2:
                      return "Gold";
                  case 3:
                      return "Character";
                  case 4:
                      return "Arm";
                  case 5:
                      return "Item";
                  case 6:
                      return "GACHA";
                  case 7:
                      return "PurchaseDiamond";
                  case 8:
                      return "ActionPoint";
                  case 9:
                      return "MonthCard";
                  case 10:
                      return "UndressEnergy";
                  case 11:
                      return "PrizeWheelCoin";
                  case 99:
                      return "DMMPoint";
              }
              break;
      }
      return value;
  }
}
