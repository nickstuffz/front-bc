import { CategoryCard } from "@/components/CategoryCard.tsx";
import { CompatComponentType, GroupedCompatDataType } from "@/types/types.ts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { useSelectedCodes } from "@/lib/selectedCodeUtils";
import { Accordion } from "@/components/ui/accordion";

interface CardGroupProps {
  groupData: CompatComponentType[];
}

export function CardGroup({ groupData }: CardGroupProps) {
  // groups the compat data by category
  const catGroupData = groupData.reduce(
    (acc: GroupedCompatDataType, compatComponent) => {
      if (!acc[compatComponent.category]) {
        acc[compatComponent.category] = [];
      }
      acc[compatComponent.category].push(compatComponent);
      return acc;
    },
    {},
  );

  const [first, second, ...rest] = groupData[0].pod_kind.split(" ");
  return (
    <Card className="card_group bg-card flex flex-col gap-2 px-0 py-2">
      <CardTitle className="flex items-center gap-4 border-b px-4 pt-2 pb-3">
        <div className="flex flex-col gap-1">
          <h3>{first + " " + second + " Option"}</h3>
          <div className="flex gap-2 font-extralight">
            {rest.map((word) => (
              <small>{word}</small>
            ))}
          </div>
        </div>
      </CardTitle>

      <CardContent className="px-4">
        <Accordion
          type="multiple"
          // defaultValue={defaultOpen}
          className="flex flex-col gap-2"
        >
          {Object.keys(catGroupData).map((category) => (
            <CategoryCard
              key={category}
              category={category}
              catCardData={catGroupData[category]}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
// DEFAULT OPEN LOGIC shelved for now
// const selectedCodes = useSelectedCodes();

// DEFAULT OPEN LOGIC (bug, not running every time), shelved for now to decide on proper UX
// determine default values for accordion, sets accordion item to open if it has a pressed code
// const defaultOpen = Object.keys(catGroupData).filter((category) => {
//   return catGroupData[category].some((component) => {
//     return selectedCodes.includes(component.code);
//   });
// });
