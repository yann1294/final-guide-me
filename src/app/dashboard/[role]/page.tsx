export default function RoleDashboardPage({
  params,
}: {
  params: { role: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Welcome to your {params.role} dashboard!
      </h1>
      <p>This page is shown after completing the profile.</p>
    </div>
  );
}
