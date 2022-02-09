import { ComponentInput } from "../../data/types";
import { ComponentsIcons } from "./ComponentsIcons";

const PlaceholderWithIcon = ({ field }: { field: ComponentInput }) => {
  const IconComponent = ComponentsIcons[field.name];

  return (
    <div className="flex items-center gap-x-2">
      <IconComponent className="w-[25px] h-[25px] pr-2 fill-yellow-500" />
      <span>Select a {field.name}</span>
    </div>
  );
};

export default PlaceholderWithIcon;
