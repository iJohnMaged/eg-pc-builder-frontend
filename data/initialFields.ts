import { PcPartField } from "./types";

const FIELDS: PcPartField[] = [
  {
    name: "CPU",
    id: 0,
    canAdd: false,
    icon: "/icons/cpu.svg",
    dataField: "cpu",
  },
  {
    name: "Motherboard",
    id: 0,
    canAdd: false,
    icon: "/icons/motherboard.svg",
    dataField: "motherboards",
  },
  {
    name: "GPU",
    id: 0,
    canAdd: true,
    icon: "/icons/gpu.svg",
    dataField: "gpu",
  },
  {
    name: "Ram",
    id: 0,
    canAdd: true,
    icon: "/icons/ram.svg",
    dataField: "ram",
  },
  {
    name: "Cooling",
    id: 0,
    canAdd: true,
    icon: "/icons/cooling.svg",
    dataField: "cooling",
  },
  {
    name: "Storage",
    id: 0,
    canAdd: true,
    icon: "/icons/storage.svg",
    dataField: "storage",
  },
  {
    name: "PSU",
    id: 0,
    canAdd: false,
    icon: "/icons/psu.svg",
    dataField: "psu",
  },
  {
    name: "Case",
    id: 0,
    canAdd: false,
    icon: "/icons/case.svg",
    dataField: "case",
  },
  {
    name: "Monitor",
    id: 0,
    canAdd: true,
    icon: "/icons/monitor.svg",
    dataField: "monitors",
  },
  {
    name: "Accessories",
    id: 0,
    canAdd: true,
    icon: "/icons/accessories.svg",
    dataField: "accessories",
  },
];

export default FIELDS;
