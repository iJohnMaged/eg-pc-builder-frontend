import AccessoriesIcon from "../../public/icons/accessories.svg";
import CaseIcon from "../../public/icons/case.svg";
import CPUIcon from "../../public/icons/cpu.svg";
import FanIcon from "../../public/icons/fan.svg";
import GPUIcon from "../../public/icons/gpu.svg";
import CoolingIcon from "../../public/icons/cooling.svg";
import MemoryIcon from "../../public/icons/ram.svg";
import MotherboardIcon from "../../public/icons/motherboard.svg";
import PowerSupplyIcon from "../../public/icons/psu.svg";
import StorageIcon from "../../public/icons/storage.svg";
import MonitorsIcon from "../../public/icons/monitor.svg";


export const ComponentsIcons: {
    [key: string]: any;
} = {
    CPU: CPUIcon,
    GPU: GPUIcon,
    Ram: MemoryIcon,
    Cooling: CoolingIcon,
    Storage: StorageIcon,
    PSU: PowerSupplyIcon,
    Motherboard: MotherboardIcon,
    Case: CaseIcon,
    Fan: FanIcon,
    Accessories: AccessoriesIcon,
    Monitor: MonitorsIcon,
}