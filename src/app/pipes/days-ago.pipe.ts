import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysAgo',
})
export class DaysAgoPipe implements PipeTransform {
  public transform(value: string | Date): string {
    if (!value) {
      return '';
    }

    const now = new Date();
    const date = new Date(value);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const interval = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };;

    for (const unit of Object.keys(interval) as Array<keyof typeof interval>) {
      const time = Math.floor(seconds / interval[unit]);
      if (time >= 1) {
        const label = time === 1 ? unit : `${unit}s`;
        return `${time} ${label} ago`;
      }
    }

    return 'just now';
  }
}
