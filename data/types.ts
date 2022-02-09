export interface Category {
    id: number;
    name: string;
}

export interface Store {
    id: number;
    name: string;
    url: string;
}

export interface Component {
    id: string;
    name: string;
    category: string;
    store: number;
    price: number;
    url: string;
    imageUrl: string;
}

export interface ComponentInput {
    id: string;
    name: string;
    canAdd: boolean;
    canRemove: boolean;
    icon: string;
    dataField: string;
}

export interface CategoryComponents {
    [key: string]: Component[];
}

export interface CategoriesComponents {
    data: CategoryComponents;
}

export interface SelectedComponents {
    [key: string]: Component;
}

export enum SimpleBuilderActionType {
    ADD_COMPONENT = 'ADD_COMPONENT',
    REMOVE_COMPONENT = 'REMOVE_COMPONENT',
    ADD_PART_FIELD = 'ADD_PART_FIELD',
    REMOVE_PART_FIELD = 'REMOVE_PART_FIELD',
}

export interface SimpleBuilderReducerState {
    fields: ComponentInput[];
    selected: SelectedComponents;
}

export interface SimpleBuilderReducerAction {
    type: SimpleBuilderActionType;
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
    state: SimpleBuilderReducerState;
    dispatch: React.Dispatch<SimpleBuilderReducerAction>;
}