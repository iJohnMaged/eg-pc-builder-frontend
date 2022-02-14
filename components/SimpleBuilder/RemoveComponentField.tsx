import { useContext } from "react";
import { ComponentInput, SimpleBuilderActionType } from "../../data/types";
import SimpleBuilderContext from "../Context/BuilderContext";

type Props = {
  field: ComponentInput;
};

const RemoveComponentField = (props: Props) => {
  const { dispatch } = useContext(SimpleBuilderContext);

  return (
    <button
      className="w-full px-5 py-1 mt-2 text-white bg-red-500 rounded shadow-xl hover:bg-red-600 md:w-max md:mt-0"
      onClick={() => {
        dispatch({
          type: SimpleBuilderActionType.REMOVE_PART_FIELD,
          payload: {
            field: props.field,
          },
        });
      }}
    >
      x
    </button>
  );
};

export default RemoveComponentField;
