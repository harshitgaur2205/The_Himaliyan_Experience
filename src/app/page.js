import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import ImageGridHero from "./Components/LandingPage/ImageGridHero";
import CombinedHeroAndProcess from "./Components/DesignProcess/page";
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <CombinedHeroAndProcess /> */}
      <div>
        <ImageGridHero />
      </div>
      
    </div>

  );
}
