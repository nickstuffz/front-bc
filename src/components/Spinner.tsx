import { LoaderCircle } from "lucide-react";

export function Spinner({ isActive }: { isActive: boolean }) {
  return (
    <LoaderCircle
      className={`w-4.5 animate-spin opacity-0 transition-opacity duration-3000 ${isActive && "opacity-100"}`}
    />
  );
}
