import { Type } from './actions';

export type State = {
  readonly playing: boolean;
};

const initialState: State = {
  playing: false
}

function reducer(state = initialState, action: any) {
  switch (action.type) {
      case Type.START_PLAYING: 
          return { playing: true };
      case Type.STOP_PLAYING:
          return { playing: false };
      default:
          return state;
  }    
}

export default reducer;