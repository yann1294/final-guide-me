import CreateTour from "../new/page";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function TourDetails({ params, searchParams }: Props) {
  return (
    <CreateTour
      searchParams={{
        ...searchParams, // Preserve any existing query params
        origin: "edit/view",
        title: "View/Edit Tour",
      }}
    />
  );
}
