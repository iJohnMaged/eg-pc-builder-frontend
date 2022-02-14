import { useContext, useState, useEffect } from "react";
import Select, { ActionMeta, createFilter, OnChangeValue } from "react-select";
import SimpleBuilderContext from "../Context/BuilderContext";
import CustomOption from "./CustomSelectOption";
import {
  Component,
  ComponentInput,
  SelectedComponent,
  SimpleBuilderActionType,
  GroupedOption,
} from "../../data/types";
import PlaceholderWithIcon from "./InputPlaceholder";
import customStyles from "./CustomStyles";
import AddNewComponentIcon from "./AddNewComponentIcon";
import RemoveComponentField from "./RemoveComponentField";
import useOptionsData from "./useOptionsData";

interface Props {
  field: ComponentInput;
}

const formatGroupLabel = (data: GroupedOption) => (
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs italic">{data.label}</span>
    <span className="bg-slate-200 rounded-3xl text-slate-800 inline-block text-xs min-w-[1px] px-2 py-0.5 text-center">
      {data.options.length}
    </span>
  </div>
);

const checkIfStillInOptions = (
  selected: SelectedComponent,
  options: Component[]
) => {
  const part = options.find((part: Component) => part.id === selected.id);
  if (part) {
    return selected;
  }
};
export default function SimpleBuilderSelect({ field }: Props) {
  const uniqueId = `${field.name}-${field.id}`;
  const { state, dispatch } = useContext(SimpleBuilderContext);
  const [selected, setSelected] = useState<
    SelectedComponent | null | undefined
  >(state.selected ? state.selected[uniqueId] : undefined);

  const { data, isLoading } = useOptionsData(
    field,
    selected,
    checkIfStillInOptions
  );

  useEffect(() => {
    if (!data && isLoading) {
      return;
    }
    if (
      !isLoading &&
      (!data || !data.defaultValue || data.defaultValue.fieldId !== field.id)
    ) {
      setSelected(null);
    }
  }, [data, isLoading, field]);
  useEffect(() => {
    if (selected === null || selected === undefined) {
      dispatch({
        type: SimpleBuilderActionType.REMOVE_COMPONENT,
        payload: {
          field,
        },
      });
      return;
    }
    dispatch({
      type: SimpleBuilderActionType.ADD_COMPONENT,
      payload: {
        field,
        data: selected,
      },
    });
  }, [selected, dispatch, field]);
  const getOptionLabel = (option: any) => {
    return `${option.name} - ${option.price} EGP`;
  };

  const getOptionValue = (option: any) => {
    return option.id;
  };

  const onChangeSelectedItem = (
    newValue: OnChangeValue<any, any>,
    actionMeta: ActionMeta<any>
  ) => {
    if (actionMeta.action === "select-option") {
      if (selected && selected.id === newValue.id) {
        return;
      }
      setSelected(newValue);
    } else if (actionMeta.action === "clear") {
      setSelected(null);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <label className="text-base font-semibold" htmlFor={uniqueId}>
        {field.name}{" "}
        {!isLoading && selected && (
          <span className="italic text-purple-400 font-bolder">
            ({selected.price} EGP)
          </span>
        )}
      </label>

      {isLoading ? (
        <div className="w-full h-6 rounded-full bg-neutral-100 animate-pulse"></div>
      ) : (
        data && (
          <>
            <div className="flex flex-col items-center gap-x-4 md:flex-row">
              <Select
                filterOption={createFilter({ ignoreAccents: false })}
                defaultValue={
                  data.defaultValue && data.defaultValue.fieldId === field.id
                    ? data.defaultValue
                    : null
                }
                inputId={uniqueId}
                options={data ? data.data.parts : []}
                instanceId={uniqueId}
                styles={customStyles}
                getOptionLabel={(option) => getOptionLabel(option)}
                getOptionValue={(option) => getOptionValue(option)}
                placeholder={<PlaceholderWithIcon field={field} />}
                onChange={onChangeSelectedItem}
                isLoading={isLoading}
                components={{ Option: CustomOption }}
                formatGroupLabel={formatGroupLabel}
                menuPlacement="auto"
                className="w-full text-sm font-bold shadow"
                isClearable
              />
              {field.canAdd && <AddNewComponentIcon field={field} />}
              {field.canRemove && <RemoveComponentField field={field} />}
            </div>
            {data && selected && (
              <div className="text-xs italic max-w-[450px] text-ellipsis overflow-hidden whitespace-nowrap">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-300"
                >
                  {selected.url}
                </a>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}
