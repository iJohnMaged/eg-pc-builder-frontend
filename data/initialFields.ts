import { ComponentInput } from "./types";
import { v4 as uuidv4 } from 'uuid';

const FIELDS: ComponentInput[] = [
  {
    name: "CPU",
    id: uuidv4(),
    canAdd: false,
    canRemove: false,
    icon: "/icons/cpu.svg",
    dataField: "cpu",
  },
  {
    name: "Motherboard",
    id: uuidv4(),
    canAdd: false,
    canRemove: false,
    icon: "/icons/motherboard.svg",
    dataField: "motherboards",
  },
  {
    name: "GPU",
    id: uuidv4(),
    canAdd: true,
    canRemove: false,
    icon: "/icons/gpu.svg",
    dataField: "gpu",
  },
  {
    name: "Ram",
    id: uuidv4(),
    canAdd: true,
    canRemove: false,
    icon: "/icons/ram.svg",
    dataField: "ram",
  },
  {
    name: "Cooling",
    id: uuidv4(),
    canAdd: true,
    canRemove: false,
    icon: "/icons/cooling.svg",
    dataField: "cooling",
  },
  {
    name: "Storage",
    id: uuidv4(),
    canAdd: true,
    canRemove: false,
    icon: "/icons/storage.svg",
    dataField: "storage",
  },
  {
    name: "PSU",
    id: uuidv4(),
    canAdd: false,
    canRemove: false,
    icon: "/icons/psu.svg",
    dataField: "psu",
  },
  {
    name: "Case",
    id: uuidv4(),
    canAdd: false,
    canRemove: false,
    icon: "/icons/case.svg",
    dataField: "case",
  },
  {
    name: "Monitor",
    id: uuidv4(),
    canAdd: true,
    canRemove: false,
    icon: "/icons/monitor.svg",
    dataField: "monitors",
  },
  {
    name: "Accessories",
    id: uuidv4(),
    canAdd: true,
    canRemove: false,
    icon: "/icons/accessories.svg",
    dataField: "accessories",
  },
];

export default FIELDS;
