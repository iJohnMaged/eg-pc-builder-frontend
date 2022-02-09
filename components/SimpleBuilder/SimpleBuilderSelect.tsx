import { useContext, useState, useEffect } from "react";
import Select, { ActionMeta, createFilter, OnChangeValue } from "react-select";
import SimpleBuilderContext from "../Context/BuilderContext";
import CustomOption from "./CustomSelectOption";
import {
  Component,
  ComponentInput,
  SimpleBuilderActionType,
} from "../../data/types";
import PlaceholderWithIcon from "./InputPlaceholder";
import customStyles from "./CustomStyles";
import AddNewComponentIcon from "./AddNewComponentIcon";
import RemoveComponentField from "./RemoveComponentField";
import useOptionsData from "./useOptionsData";

interface Props {
  field: ComponentInput;
}

export default function SimpleBuilderSelect({ field }: Props) {
  const uniqueId = `${field.name}-${field.id}`;
  const { state, dispatch } = useContext(SimpleBuilderContext);
  const [selected, setSelected] = useState<Component | null | undefined>(
    state.selected ? state.selected[uniqueId] : undefined
  );

  const { options, isLoading, isError } = useOptionsData(field.dataField);

  const getOptionLabel = (option: any) => {
    return `${option.name} - ${option.price} EGP`;
  };

  const getOptionValue = (option: any) => {
    return option.id;
  };

  const getSelectedItemFromOptions = () => {
    if (!selected) {
      return null;
    }
    const selectedId = selected.id;
    const part = options.parts.find(
      (part: Component) => part.id === selectedId
    );
    if (!part) {
      setSelected(null);
      dispatch({
        type: SimpleBuilderActionType.REMOVE_COMPONENT,
        payload: {
          field,
        },
      });
    }
    return part;
  };

  const onChangeSelectedItem = (
    newValue: OnChangeValue<any, any>,
    actionMeta: ActionMeta<any>
  ) => {
    console.log("triggering onChangeSelectedItem");

    if (actionMeta.action === "select-option") {
      setSelected(newValue);
      dispatch({
        type: SimpleBuilderActionType.ADD_COMPONENT,
        payload: {
          field,
          data: newValue,
        },
      });
    } else if (actionMeta.action === "clear") {
      setSelected(null);
      dispatch({
        type: SimpleBuilderActionType.REMOVE_COMPONENT,
        payload: {
          field,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label
        className="text-base font-semibold text-neutral-800"
        htmlFor={uniqueId}
      >
        {field.name}{" "}
        {!isLoading && selected && (
          <span className="italic text-purple-600 font-bolder">
            ({selected.price} EGP)
          </span>
        )}
      </label>

      {isLoading ? (
        <div className="w-[550px] h-6 bg-neutral-100 animate-pulse rounded-full"></div>
      ) : (
        <>
          <div className="flex items-center gap-x-4">
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              defaultValue={selected ? getSelectedItemFromOptions() : null}
              inputId={uniqueId}
              options={options ? options.parts : []}
              instanceId={uniqueId}
              styles={customStyles}
              getOptionLabel={(option) => getOptionLabel(option)}
              getOptionValue={(option) => getOptionValue(option)}
              placeholder={<PlaceholderWithIcon field={field} />}
              onChange={onChangeSelectedItem}
              isLoading={isLoading}
              components={{ Option: CustomOption }}
              menuPlacement="auto"
              className="w-[550px] text-sm font-bold"
              isClearable
            />
            {field.canAdd && <AddNewComponentIcon field={field} />}
            {field.canRemove && <RemoveComponentField field={field} />}
          </div>
          {options && selected && (
            <div className="text-xs italic max-w-[450px] text-ellipsis overflow-hidden whitespace-nowrap">
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="text-purple-500"
              >
                {selected.url}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
