import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRateSched, defaultValue } from 'app/shared/model/rate-sched.model';

export const ACTION_TYPES = {
  FETCH_RATESCHED_LIST: 'rateSched/FETCH_RATESCHED_LIST',
  FETCH_RATESCHED: 'rateSched/FETCH_RATESCHED',
  CREATE_RATESCHED: 'rateSched/CREATE_RATESCHED',
  UPDATE_RATESCHED: 'rateSched/UPDATE_RATESCHED',
  DELETE_RATESCHED: 'rateSched/DELETE_RATESCHED',
  RESET: 'rateSched/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRateSched>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RateSchedState = Readonly<typeof initialState>;

// Reducer

export default (state: RateSchedState = initialState, action): RateSchedState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RATESCHED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RATESCHED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RATESCHED):
    case REQUEST(ACTION_TYPES.UPDATE_RATESCHED):
    case REQUEST(ACTION_TYPES.DELETE_RATESCHED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RATESCHED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RATESCHED):
    case FAILURE(ACTION_TYPES.CREATE_RATESCHED):
    case FAILURE(ACTION_TYPES.UPDATE_RATESCHED):
    case FAILURE(ACTION_TYPES.DELETE_RATESCHED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RATESCHED_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RATESCHED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RATESCHED):
    case SUCCESS(ACTION_TYPES.UPDATE_RATESCHED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RATESCHED):
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

const apiUrl = 'api/rate-scheds';

// Actions

export const getEntities: ICrudGetAllAction<IRateSched> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RATESCHED_LIST,
  payload: axios.get<IRateSched>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRateSched> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RATESCHED,
    payload: axios.get<IRateSched>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRateSched> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RATESCHED,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRateSched> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RATESCHED,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRateSched> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RATESCHED,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
