import { IntroLoader } from "@/components/intro-loader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroLoader />
      {children}
    </>
  );
}
