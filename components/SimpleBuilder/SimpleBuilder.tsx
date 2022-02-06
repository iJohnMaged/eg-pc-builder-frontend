import { useContext } from "react";
import SimpleBuilderSelect from "./SimpleBuilderSelect";
import SimpleBuilderContext from "../Context/BuilderContext";

export default function SimpleBuilder() {
  const value = useContext(SimpleBuilderContext);

  return (
    <div className="flex flex-col items-start w-max mx-auto gap-4 pb-4 text-xl font-ABeeZee text-neutral-700">
      {value.state &&
        value.state.fields.map((field) => (
          <SimpleBuilderSelect
            field={field}
            key={`${field.name}-${field.id}`}
          />
        ))}
    </div>
  );
}