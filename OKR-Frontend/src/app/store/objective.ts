import {Action} from '@ngrx/store'


const intialState={
    showobjective : false
    }


export function changeObjective(state = intialState, action: Action) {
    switch (action.type) {
  
      case 'SHOW_OBJECTIVE':
        return { ...state, showobjective: !state.showobjective };

      default:
        return intialState;
  
    }
  }