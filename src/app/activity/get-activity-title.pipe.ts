import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getActivityTitle'
})
export class GetActivityTitlePipe implements PipeTransform {
    private limitLen : number = 25;
  transform(value: string, getContext?: boolean): string {
      if(getContext) {
          value = value.split(",<p>", 2)[1].replace("活动介绍：", "");
      }
      else
      {
          value=value.split(",<p>",1)[0].replace("<t>","");
      }
      if(value.length>this.limitLen)
          value = value.substr(0, this.limitLen) + " ...";
      return value;
  }
}
