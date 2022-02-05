import { PcPartField } from "./types";

const FIELDS: PcPartField[] = [
  {
    name: "CPU",
    id: 0,
    canAdd: false,
    icon: "/icons/cpu.svg",
  },
  {
    name: "Motherboard",
    id: 0,
    canAdd: false,
    icon: "/icons/motherboard.svg",
  },
  {
    name: "GPU",
    id: 0,
    canAdd: true,
    icon: "/icons/gpu.svg",
  },
  {
    name: "Ram",
    id: 0,
    canAdd: true,
    icon: "/icons/ram.svg",
  },
  {
    name: "Cooling",
    id: 0,
    canAdd: true,
    icon: "/icons/cooling.svg",
  },
  {
    name: "Storage",
    id: 0,
    canAdd: true,
    icon: "/icons/storage.svg",
  },
  {
    name: "PSU",
    id: 0,
    canAdd: false,
    icon: "/icons/psu.svg",
  },
  {
    name: "Case",
    id: 0,
    canAdd: false,
    icon: "/icons/case.svg",
  },
  {
    name: "Monitor",
    id: 0,
    canAdd: true,
    icon: "/icons/monitor.svg",
  },
  {
    name: "Accessories",
    id: 0,
    canAdd: true,
    icon: "/icons/accessories.svg",
  },
];

export default FIELDS;
