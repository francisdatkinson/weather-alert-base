export default interface Location {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number
  },
  visibility: number,
  wind: {
    deg: number,
    speed: number
  },
  clouds: {
    all: number
  },
  dt: number,
  timezone: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  id: number,
  name: string,
  cod: number
}
