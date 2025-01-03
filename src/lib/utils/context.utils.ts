export type CONTEXT = {
    context: "tours" | "packages";
};

export const ContextType = {
    tour: { context: "tours" } as CONTEXT,
    package: { context: "packages" } as CONTEXT,
};
