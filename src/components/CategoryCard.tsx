import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { compatComponent } from "../types/types.ts";

interface CategoryCardProps {
  category: string;
  compatData: compatComponent[];
}

export default function CategoryCard({
  category,
  compatData,
}: CategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>compatible {category}s</CardTitle>
        {/* <CardDescription> Description </CardDescription> */}
      </CardHeader>
      <CardContent className="text-sm">
        {compatData.map((compatComponent) => (
          <li key={compatComponent.id}>
            {compatComponent.code} <br />
            {compatComponent.note}
          </li>
        ))}
      </CardContent>
      {/* <CardFooter className="text-sm">Footer</CardFooter> */}
    </Card>
  );
}
