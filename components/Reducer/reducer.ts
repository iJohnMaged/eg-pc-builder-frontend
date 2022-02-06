import { SimpleBuilderReducerState, SimpleBuilderReducerAction, ActionType, PcPartField } from "../../data/types";

const addNewField = (fields: PcPartField[], field: PcPartField) => {
  const clickedFieldIdx = fields.findIndex(f => f.id === field.id && f.name === field.name);
  // find biggest id
  const lastFieldOfCategory = fields.reduce((acc, curr, idx) => {
    if (curr.name === field.name && curr.id > acc.id) {
      return {
        id: curr.id,
        idx: idx,
      }
    }
    return acc;
  }, {
    id: field.id,
    idx: clickedFieldIdx,
  });

  // Append after lastFieldOfCategory.idx
  const newFields = [...fields];
  const newField = { ...field, id: lastFieldOfCategory.id + 1 };
  newFields.splice(lastFieldOfCategory.idx + 1, 0, newField);
  return newFields;
}

const reducer = (state: SimpleBuilderReducerState, action: SimpleBuilderReducerAction) => {
  switch (action.type) {
    case ActionType.ADD_COMPONENT:
      {
        const { field, data } = action.payload;
        const keyToAdd = `${field.name}-${field.id}`;
        return {
          ...state,
          selected: {
            ...state.selected,
            [keyToAdd]: data,
          },
        };
      }
    case ActionType.REMOVE_COMPONENT:
      {
        const { field } = action.payload;
        const keyToRemove = `${field.name}-${field.id}`;
        const newSelected = { ...state.selected };
        delete newSelected[keyToRemove];
        return {
          ...state,
          selected: newSelected,
        };
      }
    case ActionType.ADD_PART_FIELD:
      return {
        ...state,
        fields: addNewField(state.fields, action.payload.field)
      }
    default:
      return state;
  }
};

export default reducer;
