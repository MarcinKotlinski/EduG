import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'game',
})
export class GamePipe implements PipeTransform {
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(it =>
      it[field].toLowerCase().indexOf(value.toLowerCase()) !=-1);
  }
}

