export interface Category {
    id: number;
    name: string;
}

export interface Store {
    id: number;
    name: string;
    url: string;
}

export interface Part {
    id: number;
    name: string;
    category: number;
    store: number;
    price: number;
    url: string;
    imageUrl: string;
}

export interface PcPartField {
    id: number;
    name: string;
    canAdd: boolean;
    icon: string;
    dataField: string;
}

interface CategoryParts {
    [key: string]: Part[];
}

export interface PartsData {
    data: CategoryParts;
}

export interface SelectedParts {
    [key: string]: Part;
}

export enum ActionType {
    ADD_COMPONENT = 'ADD_COMPONENT',
    REMOVE_COMPONENT = 'REMOVE_COMPONENT',
    ADD_PART_FIELD = 'ADD_PART_FIELD',
}

export interface SimpleBuilderReducerState {
    fields: PcPartField[];
    options: PartsData;
    selected: SelectedParts;
}

export interface SimpleBuilderReducerAction {
    type: ActionType;
    payload: any;
}

export enum NavSelectedTab {
    Home = 'Home',
    About = 'About',
    SimpleBuilder = 'SimpleBuilder',
    AdvancedBuilder = 'AdvancedBuilder',
    None = 'None',
}

export interface SimpleBuilderContextType {
    state: SimpleBuilderReducerState | undefined;
    dispatch: React.Dispatch<SimpleBuilderReducerAction> | undefined;
}