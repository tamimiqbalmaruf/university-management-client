type TRoute = {
    path: string;
    element: React.ReactNode;
};

type TUserPath = {
    name: string;
    path?: string;
    element?: React.ReactNode;
    children?: TUserPath[]
}

export const routesGenerator = (items: TUserPath[]) => {

    const routes = items.reduce((acc: TRoute[], item) => {
        if (item.path && item.element) {
            acc.push({
                path: item.path,
                element: item.element,
            });
        }

        if (item.children) {
            item.children.forEach((child) => {
                acc.push({
                    path: child.path!,
                    element: child.element,
                });
            });
        }

        return acc;
    }, []);

    return routes;
};