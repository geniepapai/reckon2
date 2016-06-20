import {Injectable, Pipe} from '@angular/core';

/*
  Generated class for the TextShort pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'textShort'
})
@Injectable()
export class TextShort {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    let limit = parseInt(args[0]);
    
    return value.length>limit ? value.substring(0,limit) + "...":value;
  }
}
