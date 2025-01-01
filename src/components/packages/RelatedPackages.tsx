import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import useGlobalStore from "@/stores/globalStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RelatedPackagesProps {
  currentPackageId: string;
}

const RelatedPackages: FC<RelatedPackagesProps> = ({ currentPackageId }) => {
  const { packages } = useGlobalStore();

  const relatedPackages =
    packages?.filter((pkg) => pkg.id !== currentPackageId) || [];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-[#6BC8B4]">
        Related Packages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPackages.map((pkg) => (
          <Link href={`/packages/${pkg.id}`} key={pkg.id}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <Image
                //src={pkg.images?.[0] || "/placeholder.jpg"}
                src="https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
                alt={pkg.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-lg text-[#FF7F47]">
                  {pkg.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-2">
                  {pkg.description.length > 60
                    ? `${pkg.description.substring(0, 60)}...`
                    : pkg.description}
                </p>
                <p className="text-sm text-[#6BC8B4] font-bold">
                  From ${pkg.price}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPackages;
