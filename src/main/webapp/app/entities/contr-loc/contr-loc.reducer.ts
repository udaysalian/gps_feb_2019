import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContrLoc, defaultValue } from 'app/shared/model/contr-loc.model';

export const ACTION_TYPES = {
  FETCH_CONTRLOC_LIST: 'contrLoc/FETCH_CONTRLOC_LIST',
  FETCH_CONTRLOC: 'contrLoc/FETCH_CONTRLOC',
  CREATE_CONTRLOC: 'contrLoc/CREATE_CONTRLOC',
  UPDATE_CONTRLOC: 'contrLoc/UPDATE_CONTRLOC',
  DELETE_CONTRLOC: 'contrLoc/DELETE_CONTRLOC',
  RESET: 'contrLoc/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContrLoc>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContrLocState = Readonly<typeof initialState>;

// Reducer

export default (state: ContrLocState = initialState, action): ContrLocState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTRLOC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTRLOC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTRLOC):
    case REQUEST(ACTION_TYPES.UPDATE_CONTRLOC):
    case REQUEST(ACTION_TYPES.DELETE_CONTRLOC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTRLOC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTRLOC):
    case FAILURE(ACTION_TYPES.CREATE_CONTRLOC):
    case FAILURE(ACTION_TYPES.UPDATE_CONTRLOC):
    case FAILURE(ACTION_TYPES.DELETE_CONTRLOC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTRLOC_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTRLOC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTRLOC):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTRLOC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTRLOC):
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

const apiUrl = 'api/contr-locs';

// Actions

export const getEntities: ICrudGetAllAction<IContrLoc> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTRLOC_LIST,
  payload: axios.get<IContrLoc>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContrLoc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTRLOC,
    payload: axios.get<IContrLoc>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContrLoc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTRLOC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContrLoc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTRLOC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContrLoc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTRLOC,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
