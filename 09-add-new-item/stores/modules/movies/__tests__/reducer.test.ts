import { actions } from '../actions';
import { selectors } from '../selectors';
import { reducer } from '../reducer';
import { initialState } from '../state';
import { ActionType } from '../types';

describe('store/ui -> reducer', () => {
  it('should handle the initial state', () => {
    // @ts-ignore
    expect(reducer(initialState, {})).toEqual({ count: 0 });
  });

  it(`should handle ${ActionType.LOADING_ENABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionEnableLoading())).toEqual({ count: 1 });
  });

  it(`should handle ${ActionType.LOADING_DISABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionDisableLoading())).toEqual({ count: 0 });
  });

  it(`should handle ${ActionType.LOADING_TOGGLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionToggleLoading())).toEqual({ count: 1 });
  });

  it('should check if is loading', () => {
    expect(selectors.isLoading({ loading: { count: 1 } })).toEqual(true);
  });
});
