import Image from "next/image";
import router from "next/navigation";
import Main from "./components/main";
import HomePage from "./components/homepage";
export default function Home() {
  return (
    <div className="w-screen  flex flex-col items-center justify-center ">
      <HomePage />
    </div>
  );
}
