import { v4 as uuidv4 } from 'uuid';
import { SimpleBuilderReducerState, SimpleBuilderReducerAction, SelectedParts, ActionType, PcPartField, CategoryParts } from "../../data/types";

const addNewField = (fields: PcPartField[], field: PcPartField) => {

  const lastIndex = fields.reduce((acc, curr, index) => {
    if (curr.name === field.name) {
      return index;
    }
    return acc;
  }, -1);

  if (lastIndex === -1) {
    return fields;
  }

  const newFields = [...fields];
  const newField = { ...field, id: uuidv4(), canAdd: false, canRemove: true };
  newFields.splice(lastIndex + 1, 0, newField);
  return newFields;
}

export const initializer = (initialState: SimpleBuilderReducerState, data: CategoryParts) => {
  if (typeof window !== 'undefined') {
    const localStorageDataRaw = localStorage.getItem("eg_simple_builder");
    if (localStorageDataRaw) {
      const localStorageData = JSON.parse(localStorageDataRaw);
      // Remove ones not in data
      const newSelected = Object.keys(localStorageData.selected).reduce((acc, curr) => {
        const part = localStorageData.selected[curr];
        data[part.category].find(p => p.id === part.id) ? acc[curr] = part : null;
        return acc;
      }, {} as SelectedParts);
      return {
        ...localStorageData,
        selected: newSelected,
      };
    }
  }
  return initialState;
}

const reducer = (state: SimpleBuilderReducerState, action: SimpleBuilderReducerAction) => {
  switch (action.type) {
    case ActionType.ADD_COMPONENT:
      {
        const { field, data } = action.payload;
        const keyToAdd = `${field.name}-${field.id}`;
        const newState = {
          ...state,
          selected: {
            ...state.selected,
            [keyToAdd]: data,
          },
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem("eg_simple_builder", JSON.stringify(newState));
        }
        return newState;
      }

    case ActionType.REMOVE_COMPONENT:
      {
        const { field } = action.payload;
        const keyToRemove = `${field.name}-${field.id}`;
        const newSelected = { ...state.selected };
        delete newSelected[keyToRemove];
        const newState = {
          ...state,
          selected: newSelected,
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem("eg_simple_builder", JSON.stringify(newState));
        }
        return newState;
      }
    case ActionType.ADD_PART_FIELD:
      {
        const newState = {
          ...state,
          fields: addNewField(state.fields, action.payload.field)
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem("eg_simple_builder", JSON.stringify(newState));
        }
        return newState;
      }
    case ActionType.REMOVE_PART_FIELD:
      {
        const newFields = state.fields.filter(f => f.id !== action.payload.field.id);
        const key = `${action.payload.field.name}-${action.payload.field.id}`;
        const newSelected = { ...state.selected };
        delete newSelected[key];
        const newState = {
          selected: newSelected,
          fields: newFields
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem("eg_simple_builder", JSON.stringify(newState));
        }
        return newState;
      }
    default:
      return state;
  }
};

export default reducer;
