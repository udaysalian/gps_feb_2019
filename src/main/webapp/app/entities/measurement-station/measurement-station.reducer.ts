import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasurementStation, defaultValue } from 'app/shared/model/measurement-station.model';

export const ACTION_TYPES = {
  FETCH_MEASUREMENTSTATION_LIST: 'measurementStation/FETCH_MEASUREMENTSTATION_LIST',
  FETCH_MEASUREMENTSTATION: 'measurementStation/FETCH_MEASUREMENTSTATION',
  CREATE_MEASUREMENTSTATION: 'measurementStation/CREATE_MEASUREMENTSTATION',
  UPDATE_MEASUREMENTSTATION: 'measurementStation/UPDATE_MEASUREMENTSTATION',
  DELETE_MEASUREMENTSTATION: 'measurementStation/DELETE_MEASUREMENTSTATION',
  RESET: 'measurementStation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasurementStation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MeasurementStationState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasurementStationState = initialState, action): MeasurementStationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASUREMENTSTATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASUREMENTSTATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASUREMENTSTATION):
    case REQUEST(ACTION_TYPES.UPDATE_MEASUREMENTSTATION):
    case REQUEST(ACTION_TYPES.DELETE_MEASUREMENTSTATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASUREMENTSTATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASUREMENTSTATION):
    case FAILURE(ACTION_TYPES.CREATE_MEASUREMENTSTATION):
    case FAILURE(ACTION_TYPES.UPDATE_MEASUREMENTSTATION):
    case FAILURE(ACTION_TYPES.DELETE_MEASUREMENTSTATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREMENTSTATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREMENTSTATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASUREMENTSTATION):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASUREMENTSTATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASUREMENTSTATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/measurement-stations';

// Actions

export const getEntities: ICrudGetAllAction<IMeasurementStation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASUREMENTSTATION_LIST,
  payload: axios.get<IMeasurementStation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMeasurementStation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASUREMENTSTATION,
    payload: axios.get<IMeasurementStation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMeasurementStation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASUREMENTSTATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasurementStation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASUREMENTSTATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasurementStation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASUREMENTSTATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
