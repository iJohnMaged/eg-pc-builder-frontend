import { useContext } from "react";
import BuilderSelect from "./BuilderSelect";
import BuilderContext from "./BuilderContext";

export default function Builder() {
  const value = useContext(BuilderContext);

  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-4 text-xl font-ABeeZee text-neutral-700">
      {value.state.fields.map((type, idx) => (
        <BuilderSelect label={type} key={type + idx} isClearable={true} />
      ))}
    </div>
  );
}
