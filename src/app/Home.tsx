import { Header } from "@/Components/Shared/Header";
import EasySuites from "./easy-suites/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-xl font-bold">
      <Header />
      <EasySuites />
    </div>
  );
}
