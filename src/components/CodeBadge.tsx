import { Badge } from "@/components/ui/badge";
import { CircleX, Anchor } from "lucide-react";
import { useSelectedCodesDispatch } from "@/providers/selectedCodesContext";
import { CodeObjType } from "@/types/types";
import { Button } from "@/components/ui/button";

interface CodeBadgeProps {
  codeObj: CodeObjType;
  index: number;
}

export function CodeBadge({ codeObj, index }: CodeBadgeProps) {
  const dispatch = useSelectedCodesDispatch(); // Consume selectedCodes dispatch function from context

  return (
    <Badge className="hover:bg-primary/90 flex h-7 items-center justify-start gap-0 py-1 pr-0 pl-1">
      {index === 0 && (
        <div className="pr-1">
          <Anchor className="size-3" />
        </div>
      )}
      {codeObj.code}
      <Button
        className="w-auto px-1"
        size="icon"
        variant="ghost"
        onClick={() => dispatch({ type: "deleted", codeObj: codeObj })}
      >
        <CircleX className="size-4" />
      </Button>
    </Badge>
  );
}
