import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CategoryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Header + Footer</CardTitle>
        <CardDescription> Card Description </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">Content</CardContent>
      <CardFooter className="text-sm">Footer</CardFooter>
    </Card>
  );
}
