import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CompatComponent from "@/components/CompatComponent.tsx";
import { CompatComponentType } from "@/types/types.ts";
import { Separator } from "@/components/ui/separator";

interface CategoryCardProps {
  category: string;
  catCardData: CompatComponentType[];
}

export default function CategoryCard({
  category,
  catCardData,
}: CategoryCardProps) {
  let prevPodId: number | null = null;
  return (
    <Card className="bg-primary-foreground m-0 flex flex-col gap-0 p-0">
      <CardTitle>{category}</CardTitle>
      <CardContent className="m-0 p-0">
        <ul className="flex list-none flex-col gap-4">
          {catCardData.map((compatComponent) => {
            const showSeparator =
              prevPodId !== null && prevPodId !== compatComponent.pod_id;
            prevPodId = compatComponent.pod_id;

            return (
              <li className="m-0 p-0" key={compatComponent.id}>
                {showSeparator && <Separator className="my-4" />}
                <CompatComponent compCompData={compatComponent} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
