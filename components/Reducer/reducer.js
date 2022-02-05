Object.removeKey = (obj, key) =>
  Object.keys(obj)
    .filter((k) => k !== key)
    .reduce((res, k) => ((res[k] = obj[k]), res), {});

const getNewFields = (oldFields, newField) => {
  // find last occurance of newFiled in oldFields
  const lastIndex = oldFields.lastIndexOf(newField);
  // if newField is not in oldFields, return oldFields
  if (lastIndex === -1) return oldFields;
  // if newField is in oldFields, add it after the last occurance of newField, and append the rest of oldFields!
  return [
    ...oldFields.slice(0, lastIndex + 1),
    newField,
    ...oldFields.slice(lastIndex + 1),
  ];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMPONENT":
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.payload.type]: action.payload.data,
        },
      };
    case "REMOVE_COMPONENT":
      return {
        ...state,
        selected: Object.removeKey(state.selected, action.payload.type),
      };
    case "ADD_FIELD":
      return {
        ...state,
        fields: getNewFields(state.fields, action.payload.type),
      };
    case "default":
      return state;
  }
};

export default reducer;
