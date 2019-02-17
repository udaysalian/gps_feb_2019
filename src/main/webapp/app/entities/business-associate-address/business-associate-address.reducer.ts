import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBusinessAssociateAddress, defaultValue } from 'app/shared/model/business-associate-address.model';

export const ACTION_TYPES = {
  FETCH_BUSINESSASSOCIATEADDRESS_LIST: 'businessAssociateAddress/FETCH_BUSINESSASSOCIATEADDRESS_LIST',
  FETCH_BUSINESSASSOCIATEADDRESS: 'businessAssociateAddress/FETCH_BUSINESSASSOCIATEADDRESS',
  CREATE_BUSINESSASSOCIATEADDRESS: 'businessAssociateAddress/CREATE_BUSINESSASSOCIATEADDRESS',
  UPDATE_BUSINESSASSOCIATEADDRESS: 'businessAssociateAddress/UPDATE_BUSINESSASSOCIATEADDRESS',
  DELETE_BUSINESSASSOCIATEADDRESS: 'businessAssociateAddress/DELETE_BUSINESSASSOCIATEADDRESS',
  RESET: 'businessAssociateAddress/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBusinessAssociateAddress>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BusinessAssociateAddressState = Readonly<typeof initialState>;

// Reducer

export default (state: BusinessAssociateAddressState = initialState, action): BusinessAssociateAddressState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BUSINESSASSOCIATEADDRESS):
    case REQUEST(ACTION_TYPES.UPDATE_BUSINESSASSOCIATEADDRESS):
    case REQUEST(ACTION_TYPES.DELETE_BUSINESSASSOCIATEADDRESS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS):
    case FAILURE(ACTION_TYPES.CREATE_BUSINESSASSOCIATEADDRESS):
    case FAILURE(ACTION_TYPES.UPDATE_BUSINESSASSOCIATEADDRESS):
    case FAILURE(ACTION_TYPES.DELETE_BUSINESSASSOCIATEADDRESS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUSINESSASSOCIATEADDRESS):
    case SUCCESS(ACTION_TYPES.UPDATE_BUSINESSASSOCIATEADDRESS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUSINESSASSOCIATEADDRESS):
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

const apiUrl = 'api/business-associate-addresses';

// Actions

export const getEntities: ICrudGetAllAction<IBusinessAssociateAddress> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS_LIST,
  payload: axios.get<IBusinessAssociateAddress>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBusinessAssociateAddress> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUSINESSASSOCIATEADDRESS,
    payload: axios.get<IBusinessAssociateAddress>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBusinessAssociateAddress> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUSINESSASSOCIATEADDRESS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBusinessAssociateAddress> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUSINESSASSOCIATEADDRESS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBusinessAssociateAddress> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUSINESSASSOCIATEADDRESS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
