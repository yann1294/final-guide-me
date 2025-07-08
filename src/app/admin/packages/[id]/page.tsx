import CreatePackage from "../new/page";

export default function PackageDetails() {
  return (
    <CreatePackage
      searchParams={{ title: "Edit Package", origin: "edit/view" }}
    />
  );
}
