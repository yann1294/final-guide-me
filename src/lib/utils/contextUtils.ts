export type CONTEXT = {
    context: "tours" | "packages" | "tourists" | "guides" | "bookings";
};

export const ContextType = {
    tour: { context: "tours" } as CONTEXT,
    package: { context: "packages" } as CONTEXT,
    tourists: { context: "tourists" } as CONTEXT,
    guides: { context: "guides" } as CONTEXT,
    bookings: { context: "bookings" } as CONTEXT,
};
