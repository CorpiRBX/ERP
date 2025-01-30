export class ParsedDate {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    timezoneOffset: number;
  
    constructor(private date: Date) {
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
      this.milliseconds = date.getMilliseconds();
      this.timezoneOffset = date.getTimezoneOffset();
    };

    get formattedTime(): string {
        return `${this.hours.toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
    };
    
    get formattedDate(): string {
        return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day.toString().padStart(2, "0")}`;
    };

    get weekOfYear(): number {
      const firstDayOfYear = new Date(this.year, 0, 1);
      const pastDaysOfYear = Math.floor((this.date.getTime() - firstDayOfYear.getTime()) / 86400000);
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };
};
  