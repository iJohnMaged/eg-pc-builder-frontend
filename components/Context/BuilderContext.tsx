import { createContext } from "react";
import { SimpleBuilderContextType } from "../../data/types";

const SimpleBuilderContext = createContext<SimpleBuilderContextType>(
  {} as SimpleBuilderContextType
);

export default SimpleBuilderContext;
