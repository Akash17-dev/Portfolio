import { LoaderVisual } from "@/components/loader-visual";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[#071321] text-white">
      <LoaderVisual />
    </main>
  );
}
