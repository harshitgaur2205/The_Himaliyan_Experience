import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import ImageGridHero from "./Components/LandingPage/ImageGridHero";
import CombinedHeroAndProcess from "./Components/DesignProcess/page";
import Page from "./Components/AboutUs/page"
export default function Home() {
  return (
    <div>
      {/* <Navbar />
      <div>
        <ImageGridHero />
      </div> */}
      <Page /> 
    </div>

  );
}
