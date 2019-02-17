import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReductionReason, defaultValue } from 'app/shared/model/reduction-reason.model';

export const ACTION_TYPES = {
  FETCH_REDUCTIONREASON_LIST: 'reductionReason/FETCH_REDUCTIONREASON_LIST',
  FETCH_REDUCTIONREASON: 'reductionReason/FETCH_REDUCTIONREASON',
  CREATE_REDUCTIONREASON: 'reductionReason/CREATE_REDUCTIONREASON',
  UPDATE_REDUCTIONREASON: 'reductionReason/UPDATE_REDUCTIONREASON',
  DELETE_REDUCTIONREASON: 'reductionReason/DELETE_REDUCTIONREASON',
  RESET: 'reductionReason/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReductionReason>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ReductionReasonState = Readonly<typeof initialState>;

// Reducer

export default (state: ReductionReasonState = initialState, action): ReductionReasonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REDUCTIONREASON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REDUCTIONREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REDUCTIONREASON):
    case REQUEST(ACTION_TYPES.UPDATE_REDUCTIONREASON):
    case REQUEST(ACTION_TYPES.DELETE_REDUCTIONREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REDUCTIONREASON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REDUCTIONREASON):
    case FAILURE(ACTION_TYPES.CREATE_REDUCTIONREASON):
    case FAILURE(ACTION_TYPES.UPDATE_REDUCTIONREASON):
    case FAILURE(ACTION_TYPES.DELETE_REDUCTIONREASON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REDUCTIONREASON_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REDUCTIONREASON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REDUCTIONREASON):
    case SUCCESS(ACTION_TYPES.UPDATE_REDUCTIONREASON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REDUCTIONREASON):
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

const apiUrl = 'api/reduction-reasons';

// Actions

export const getEntities: ICrudGetAllAction<IReductionReason> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REDUCTIONREASON_LIST,
  payload: axios.get<IReductionReason>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IReductionReason> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REDUCTIONREASON,
    payload: axios.get<IReductionReason>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReductionReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REDUCTIONREASON,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReductionReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REDUCTIONREASON,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReductionReason> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REDUCTIONREASON,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
