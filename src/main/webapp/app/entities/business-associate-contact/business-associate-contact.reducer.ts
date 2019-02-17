import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBusinessAssociateContact, defaultValue } from 'app/shared/model/business-associate-contact.model';

export const ACTION_TYPES = {
  FETCH_BUSINESSASSOCIATECONTACT_LIST: 'businessAssociateContact/FETCH_BUSINESSASSOCIATECONTACT_LIST',
  FETCH_BUSINESSASSOCIATECONTACT: 'businessAssociateContact/FETCH_BUSINESSASSOCIATECONTACT',
  CREATE_BUSINESSASSOCIATECONTACT: 'businessAssociateContact/CREATE_BUSINESSASSOCIATECONTACT',
  UPDATE_BUSINESSASSOCIATECONTACT: 'businessAssociateContact/UPDATE_BUSINESSASSOCIATECONTACT',
  DELETE_BUSINESSASSOCIATECONTACT: 'businessAssociateContact/DELETE_BUSINESSASSOCIATECONTACT',
  RESET: 'businessAssociateContact/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBusinessAssociateContact>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BusinessAssociateContactState = Readonly<typeof initialState>;

// Reducer

export default (state: BusinessAssociateContactState = initialState, action): BusinessAssociateContactState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BUSINESSASSOCIATECONTACT):
    case REQUEST(ACTION_TYPES.UPDATE_BUSINESSASSOCIATECONTACT):
    case REQUEST(ACTION_TYPES.DELETE_BUSINESSASSOCIATECONTACT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT):
    case FAILURE(ACTION_TYPES.CREATE_BUSINESSASSOCIATECONTACT):
    case FAILURE(ACTION_TYPES.UPDATE_BUSINESSASSOCIATECONTACT):
    case FAILURE(ACTION_TYPES.DELETE_BUSINESSASSOCIATECONTACT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUSINESSASSOCIATECONTACT):
    case SUCCESS(ACTION_TYPES.UPDATE_BUSINESSASSOCIATECONTACT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUSINESSASSOCIATECONTACT):
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

const apiUrl = 'api/business-associate-contacts';

// Actions

export const getEntities: ICrudGetAllAction<IBusinessAssociateContact> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT_LIST,
  payload: axios.get<IBusinessAssociateContact>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBusinessAssociateContact> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUSINESSASSOCIATECONTACT,
    payload: axios.get<IBusinessAssociateContact>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBusinessAssociateContact> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUSINESSASSOCIATECONTACT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBusinessAssociateContact> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUSINESSASSOCIATECONTACT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBusinessAssociateContact> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUSINESSASSOCIATECONTACT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
