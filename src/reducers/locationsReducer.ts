import { AllActions } from '../actions/allActions';
import { ActionTypes } from '../constants/actions';
import LocationsState from '../interfaces/LocationsState';

const initialState: LocationsState = {
  initialLoad: true,
  locations: [
    {
        coord: {
          lon: 0,
          lat: 0
        },
        weather: [
          {
            id: 0,
            main: '',
            description: '',
            icon: ''
          }
        ],
        base: '',
        main: {
          temp: 0,
          pressure: 0,
          humidity: 0,
          temp_min: 0,
          temp_max: 0
        },
        visibility: 0,
        wind: {
          deg: 0,
          speed: 0
        },
        clouds: {
          all: 0
        },
        dt: 0,
        timezone: 0,
        sys: {
          type: 0,
          id: 0,
          message: 0,
          country: '',
          sunrise: 0,
          sunset: 0
        },
        id: 0,
        name: '',
        cod: 0
      }
  
  ],
};

export default function locationsReducer(
  locationsState: LocationsState = initialState,
  action: AllActions,
): LocationsState {
  switch (action.type) {
    case ActionTypes.GetLocationsSuccess:
      return { ...locationsState, ...action.locationsState };
    case ActionTypes.UpdateLocationsSuccess:
      if (locationsState.locations !== undefined) {
        locationsState.locations.push(action.locationsState);

        return { ...locationsState };
      }

      return { locations: [action.locationsState], initialLoad: false };
    case ActionTypes.RemoveLocationsSuccess:
      return { ...locationsState, ...action.locationsState };
    default:
      return locationsState;
  }
}
