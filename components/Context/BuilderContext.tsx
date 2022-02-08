import { createContext } from "react";
import { SimpleBuilderContextType } from "../../data/types";

const defaultContext = {
  state: undefined,
  dispatch: undefined,
  options: undefined,
};
const SimpleBuilderContext =
  createContext<SimpleBuilderContextType>(defaultContext);

export default SimpleBuilderContext;
