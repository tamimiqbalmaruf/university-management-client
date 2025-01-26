export type TRoute = {
    path: string;
    element: React.ReactNode;
};

export type TUserPath = {
    name: string;
    path?: string;
    element?: React.ReactNode;
    children?: TUserPath[]
}

export type TSidebarItem = {
    key: string;
    label: React.ReactNode;
    children?: {
        key: string;
        label: React.ReactNode;
    }[]
};

