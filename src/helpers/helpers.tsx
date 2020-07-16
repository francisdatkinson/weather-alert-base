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
  }
}

export default f;