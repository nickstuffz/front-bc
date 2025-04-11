import { LoaderCircle } from "lucide-react";

export function Spinner({ isActive }: { isActive: boolean }) {
  return (
    <LoaderCircle
      className={`w-4.5 animate-spin [animation-duration:300ms] ${isActive ? "block" : "hidden"}`}
    />
  );
}
