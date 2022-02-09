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
      className="px-5 py-1 text-white bg-red-400 rounded-lg hover:bg-red-500"
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
