import { useContext } from "react";
import BuilderSelect from "./BuilderSelect";
import BuilderContext from "./BuilderContext";

export default function Builder() {
  const value = useContext(BuilderContext);

  return (
    <div className="flex flex-col items-start w-max mx-auto gap-4 pb-4 text-xl font-ABeeZee text-neutral-700">
      {value.state.fields.map((field) => (
        <BuilderSelect
          field={field}
          key={`${field.name}-${field.id}`}
          isClearable={true}
        />
      ))}
    </div>
  );
}
