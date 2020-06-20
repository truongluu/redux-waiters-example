import { createReducer } from 'redux-act';
import { createActionResources } from 'redux-waiters';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms, ms));

const initialState = {
  counter: 0,
  error: false,
  msg: ''
};

export const addNumberAction = createActionResources('add number');
export const minusNumberAction = createActionResources('minus number');

export default createReducer({
  [addNumberAction.start]: (state) => ({
    ...state,
    error: false,
    msg: ''
  }),
  [minusNumberAction.start]: (state) => ({
    ...state,
    error: false,
    msg: ''
  }),
  [addNumberAction.success]: (state) => ({
    ...state,
    counter: state.counter + 1
  }),
  [minusNumberAction.error]: (state, msg) => ({
    ...state,
    error: true,
    msg
  })
}, initialState);

export const addNumberCreator = () => addNumberAction.waiterAction(async (dispatch) => {
  dispatch(addNumberAction.start());
  await delay(1000);
  dispatch(addNumberAction.success());

});

export const minusNumberCreator = () => minusNumberAction.waiterAction(async (dispatch) => {
  try {
    dispatch(minusNumberAction.start());
    await delay(1000);
    throw new Error('error ocurred when minus number');
  } catch (error) {
    dispatch(minusNumberAction.error());
  }


});