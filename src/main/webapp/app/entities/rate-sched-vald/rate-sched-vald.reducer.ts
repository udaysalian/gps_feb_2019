import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRateSchedVald, defaultValue } from 'app/shared/model/rate-sched-vald.model';

export const ACTION_TYPES = {
  FETCH_RATESCHEDVALD_LIST: 'rateSchedVald/FETCH_RATESCHEDVALD_LIST',
  FETCH_RATESCHEDVALD: 'rateSchedVald/FETCH_RATESCHEDVALD',
  CREATE_RATESCHEDVALD: 'rateSchedVald/CREATE_RATESCHEDVALD',
  UPDATE_RATESCHEDVALD: 'rateSchedVald/UPDATE_RATESCHEDVALD',
  DELETE_RATESCHEDVALD: 'rateSchedVald/DELETE_RATESCHEDVALD',
  RESET: 'rateSchedVald/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRateSchedVald>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RateSchedValdState = Readonly<typeof initialState>;

// Reducer

export default (state: RateSchedValdState = initialState, action): RateSchedValdState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RATESCHEDVALD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RATESCHEDVALD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RATESCHEDVALD):
    case REQUEST(ACTION_TYPES.UPDATE_RATESCHEDVALD):
    case REQUEST(ACTION_TYPES.DELETE_RATESCHEDVALD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RATESCHEDVALD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RATESCHEDVALD):
    case FAILURE(ACTION_TYPES.CREATE_RATESCHEDVALD):
    case FAILURE(ACTION_TYPES.UPDATE_RATESCHEDVALD):
    case FAILURE(ACTION_TYPES.DELETE_RATESCHEDVALD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RATESCHEDVALD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RATESCHEDVALD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RATESCHEDVALD):
    case SUCCESS(ACTION_TYPES.UPDATE_RATESCHEDVALD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RATESCHEDVALD):
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

const apiUrl = 'api/rate-sched-valds';

// Actions

export const getEntities: ICrudGetAllAction<IRateSchedVald> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RATESCHEDVALD_LIST,
  payload: axios.get<IRateSchedVald>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRateSchedVald> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RATESCHEDVALD,
    payload: axios.get<IRateSchedVald>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRateSchedVald> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RATESCHEDVALD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRateSchedVald> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RATESCHEDVALD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRateSchedVald> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RATESCHEDVALD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
