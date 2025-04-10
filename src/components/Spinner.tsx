import { LoaderCircle } from "lucide-react";

export function Spinner({ isActive }: { isActive: boolean }) {
  return (
    <LoaderCircle
      className={`w-4.5 animate-spin transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
    />
  );
}
