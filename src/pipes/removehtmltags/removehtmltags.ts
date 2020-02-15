import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removehtmltags',
})
export class RemovehtmltagsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  result;

  transform(value: string) {
    if (value) {
      this.result = value.replace(/<\/?[^>]+>/gi, " "); //removing html tag using regex pattern
      return this.result;
    } else {
    }

  }
}
