import { actionTypes } from '../constants';
import { getSlashStrPath, combineReducers } from '../utils/reducers';
import { getQueryName } from '../utils/query';

const { SET_LISTENER, LISTENER_ERROR, LISTENER_RESPONSE } = actionTypes;

/**
 * Reducer for requesting state.Changed by `START`, `NO_VALUE`, and `SET` actions.
 * @param  {Object} [state={}] - Current requesting redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @param  {String} action.meta - The meta information of the query
 * @return {Object} Profile state after reduction
 */
export const requestingReducer = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case SET_LISTENER:
      return {
        ...state,
        [getSlashStrPath(payload.name)]: true,
      };
    case LISTENER_ERROR:
    case LISTENER_RESPONSE:
      return {
        ...state,
        [getSlashStrPath(getQueryName(meta))]: false,
      };
    default:
      return state;
  }
};

/**
 * Reducer for requested state. Changed by `START`, `NO_VALUE`, and `SET` actions.
 * @param  {Object} [state={}] - Current requested redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @param  {String} action.meta - The meta information of the query
 * @return {Object} Profile state after reduction
 */
export const requestedReducer = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case SET_LISTENER:
      return {
        ...state,
        [getSlashStrPath(payload.name)]: false,
      };
    case LISTENER_ERROR:
    case LISTENER_RESPONSE:
      return {
        ...state,
        [getSlashStrPath(getQueryName(meta))]: true,
      };
    default:
      return state;
  }
};

/**
 * Reducer for timestamps state. Changed by `START`, `NO_VALUE`, and `SET` actions.
 * @param  {Object} [state={}] - Current timestamps redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const timestampsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_LISTENER:
      return {
        ...state,
        [getSlashStrPath(payload.name)]: Date.now(),
      };
    default:
      return state;
  }
};

/**
 * @name statusReducer
 * Reducer for `status` state. Made from requestingReducer ,requestedReducer,
 * and timestampsReducer reducers combined together using combineReducers.
 * @param  {Object} [state={}] - Current listeners state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export default combineReducers({
  requesting: requestingReducer,
  requested: requestedReducer,
  timestamps: timestampsReducer,
});
