import { SimpleBuilderReducerState, SimpleBuilderReducerAction, ActionType } from "../../data/types";


const reducer = (state: SimpleBuilderReducerState, action: SimpleBuilderReducerAction) => {
  switch (action.type) {
    case ActionType.ADD_COMPONENT:
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.payload.type]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
