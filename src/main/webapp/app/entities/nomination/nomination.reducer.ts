import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INomination, defaultValue } from 'app/shared/model/nomination.model';

export const ACTION_TYPES = {
  FETCH_NOMINATION_LIST: 'nomination/FETCH_NOMINATION_LIST',
  FETCH_NOMINATION: 'nomination/FETCH_NOMINATION',
  CREATE_NOMINATION: 'nomination/CREATE_NOMINATION',
  UPDATE_NOMINATION: 'nomination/UPDATE_NOMINATION',
  DELETE_NOMINATION: 'nomination/DELETE_NOMINATION',
  RESET: 'nomination/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INomination>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NominationState = Readonly<typeof initialState>;

// Reducer

export default (state: NominationState = initialState, action): NominationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOMINATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOMINATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOMINATION):
    case REQUEST(ACTION_TYPES.UPDATE_NOMINATION):
    case REQUEST(ACTION_TYPES.DELETE_NOMINATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOMINATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOMINATION):
    case FAILURE(ACTION_TYPES.CREATE_NOMINATION):
    case FAILURE(ACTION_TYPES.UPDATE_NOMINATION):
    case FAILURE(ACTION_TYPES.DELETE_NOMINATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOMINATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOMINATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOMINATION):
    case SUCCESS(ACTION_TYPES.UPDATE_NOMINATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOMINATION):
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

const apiUrl = 'api/nominations';

// Actions

export const getEntities: ICrudGetAllAction<INomination> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOMINATION_LIST,
  payload: axios.get<INomination>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INomination> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOMINATION,
    payload: axios.get<INomination>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INomination> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOMINATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INomination> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOMINATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INomination> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOMINATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
