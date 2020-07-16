import { isContext } from "vm";

const f = {
  getDay(date: Date, timezone: number): string {
    const days: string[] =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let index: number = date.getDay() + timezone - 1;
    if (index > 6) {
      index -= 7;
    }
    return days[index]
  },

  getLocalTime(date: Date, timezone: number): Date {
    return  new Date(date.getTime() + timezone * 1000);
  },

  getBearing(deg: number): string {
    let bearings: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    return `${deg + String.fromCharCode(176) + bearings[Math.round(deg / 45)]}`;
  },

  cToF(tempInC: number): number {
    return (tempInC * 9/5 + 32);
  },

  cToK(tempInC: number): number {
    return tempInC + 273.15;
  },

  cToX(tempInC: number, output: string): number {
    switch (output) {
      case 'C':
        return tempInC;
      case 'F':
        return this.cToF(tempInC);
      case 'K':
        return this.cToK(tempInC);
      default:
        return tempInC;
    }
  },

  mphToKph(speedInMph: number): number {
    return speedInMph * 1.60934;
  },

  mphToKn(speedInMph: number): number {
    return speedInMph * 0.868976;
  },

  mphToX(speedInMph: number, output: string): number {
    switch (output) {
      case 'mph':
        return speedInMph;
      case 'kph':
        return this.mphToKph(speedInMph);
      case 'kn':
        return this.mphToKn(speedInMph);
      default:
        return speedInMph;
    }
  },
}

export default f;