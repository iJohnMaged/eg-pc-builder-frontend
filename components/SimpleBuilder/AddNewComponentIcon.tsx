import { useContext } from "react";
import { ComponentInput, SimpleBuilderActionType } from "../../data/types";
import SimpleBuilderContext from "../Context/BuilderContext";

type Props = {
  field: ComponentInput;
};

const AddNewComponentIcon = (props: Props) => {
  const { dispatch } = useContext(SimpleBuilderContext);

  return (
    <button
      className="px-5 py-1 text-white rounded-lg bg-emerald-400 hover:bg-emerald-500"
      onClick={() => {
        dispatch({
          type: SimpleBuilderActionType.ADD_PART_FIELD,
          payload: {
            field: props.field,
          },
        });
      }}
    >
      +
    </button>
  );
};

export default AddNewComponentIcon;
