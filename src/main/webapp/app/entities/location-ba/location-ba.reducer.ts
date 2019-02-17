import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILocationBA, defaultValue } from 'app/shared/model/location-ba.model';

export const ACTION_TYPES = {
  FETCH_LOCATIONBA_LIST: 'locationBA/FETCH_LOCATIONBA_LIST',
  FETCH_LOCATIONBA: 'locationBA/FETCH_LOCATIONBA',
  CREATE_LOCATIONBA: 'locationBA/CREATE_LOCATIONBA',
  UPDATE_LOCATIONBA: 'locationBA/UPDATE_LOCATIONBA',
  DELETE_LOCATIONBA: 'locationBA/DELETE_LOCATIONBA',
  RESET: 'locationBA/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILocationBA>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type LocationBAState = Readonly<typeof initialState>;

// Reducer

export default (state: LocationBAState = initialState, action): LocationBAState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOCATIONBA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOCATIONBA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOCATIONBA):
    case REQUEST(ACTION_TYPES.UPDATE_LOCATIONBA):
    case REQUEST(ACTION_TYPES.DELETE_LOCATIONBA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOCATIONBA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOCATIONBA):
    case FAILURE(ACTION_TYPES.CREATE_LOCATIONBA):
    case FAILURE(ACTION_TYPES.UPDATE_LOCATIONBA):
    case FAILURE(ACTION_TYPES.DELETE_LOCATIONBA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCATIONBA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCATIONBA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOCATIONBA):
    case SUCCESS(ACTION_TYPES.UPDATE_LOCATIONBA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOCATIONBA):
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

const apiUrl = 'api/location-bas';

// Actions

export const getEntities: ICrudGetAllAction<ILocationBA> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOCATIONBA_LIST,
  payload: axios.get<ILocationBA>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ILocationBA> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOCATIONBA,
    payload: axios.get<ILocationBA>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILocationBA> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOCATIONBA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILocationBA> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOCATIONBA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILocationBA> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOCATIONBA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
