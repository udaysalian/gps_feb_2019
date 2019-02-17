import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBusinessAssociate, defaultValue } from 'app/shared/model/business-associate.model';

export const ACTION_TYPES = {
  FETCH_BUSINESSASSOCIATE_LIST: 'businessAssociate/FETCH_BUSINESSASSOCIATE_LIST',
  FETCH_BUSINESSASSOCIATE: 'businessAssociate/FETCH_BUSINESSASSOCIATE',
  CREATE_BUSINESSASSOCIATE: 'businessAssociate/CREATE_BUSINESSASSOCIATE',
  UPDATE_BUSINESSASSOCIATE: 'businessAssociate/UPDATE_BUSINESSASSOCIATE',
  DELETE_BUSINESSASSOCIATE: 'businessAssociate/DELETE_BUSINESSASSOCIATE',
  RESET: 'businessAssociate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBusinessAssociate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BusinessAssociateState = Readonly<typeof initialState>;

// Reducer

export default (state: BusinessAssociateState = initialState, action): BusinessAssociateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSASSOCIATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSASSOCIATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BUSINESSASSOCIATE):
    case REQUEST(ACTION_TYPES.UPDATE_BUSINESSASSOCIATE):
    case REQUEST(ACTION_TYPES.DELETE_BUSINESSASSOCIATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSASSOCIATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSASSOCIATE):
    case FAILURE(ACTION_TYPES.CREATE_BUSINESSASSOCIATE):
    case FAILURE(ACTION_TYPES.UPDATE_BUSINESSASSOCIATE):
    case FAILURE(ACTION_TYPES.DELETE_BUSINESSASSOCIATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSASSOCIATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSASSOCIATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUSINESSASSOCIATE):
    case SUCCESS(ACTION_TYPES.UPDATE_BUSINESSASSOCIATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUSINESSASSOCIATE):
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

const apiUrl = 'api/business-associates';

// Actions

export const getEntities: ICrudGetAllAction<IBusinessAssociate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUSINESSASSOCIATE_LIST,
  payload: axios.get<IBusinessAssociate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBusinessAssociate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUSINESSASSOCIATE,
    payload: axios.get<IBusinessAssociate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBusinessAssociate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUSINESSASSOCIATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBusinessAssociate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUSINESSASSOCIATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBusinessAssociate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUSINESSASSOCIATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
