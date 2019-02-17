import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INominationPriority, defaultValue } from 'app/shared/model/nomination-priority.model';

export const ACTION_TYPES = {
  FETCH_NOMINATIONPRIORITY_LIST: 'nominationPriority/FETCH_NOMINATIONPRIORITY_LIST',
  FETCH_NOMINATIONPRIORITY: 'nominationPriority/FETCH_NOMINATIONPRIORITY',
  CREATE_NOMINATIONPRIORITY: 'nominationPriority/CREATE_NOMINATIONPRIORITY',
  UPDATE_NOMINATIONPRIORITY: 'nominationPriority/UPDATE_NOMINATIONPRIORITY',
  DELETE_NOMINATIONPRIORITY: 'nominationPriority/DELETE_NOMINATIONPRIORITY',
  RESET: 'nominationPriority/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INominationPriority>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NominationPriorityState = Readonly<typeof initialState>;

// Reducer

export default (state: NominationPriorityState = initialState, action): NominationPriorityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOMINATIONPRIORITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOMINATIONPRIORITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOMINATIONPRIORITY):
    case REQUEST(ACTION_TYPES.UPDATE_NOMINATIONPRIORITY):
    case REQUEST(ACTION_TYPES.DELETE_NOMINATIONPRIORITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOMINATIONPRIORITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOMINATIONPRIORITY):
    case FAILURE(ACTION_TYPES.CREATE_NOMINATIONPRIORITY):
    case FAILURE(ACTION_TYPES.UPDATE_NOMINATIONPRIORITY):
    case FAILURE(ACTION_TYPES.DELETE_NOMINATIONPRIORITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOMINATIONPRIORITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOMINATIONPRIORITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOMINATIONPRIORITY):
    case SUCCESS(ACTION_TYPES.UPDATE_NOMINATIONPRIORITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOMINATIONPRIORITY):
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

const apiUrl = 'api/nomination-priorities';

// Actions

export const getEntities: ICrudGetAllAction<INominationPriority> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOMINATIONPRIORITY_LIST,
  payload: axios.get<INominationPriority>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INominationPriority> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOMINATIONPRIORITY,
    payload: axios.get<INominationPriority>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INominationPriority> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOMINATIONPRIORITY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INominationPriority> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOMINATIONPRIORITY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INominationPriority> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOMINATIONPRIORITY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
