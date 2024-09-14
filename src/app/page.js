import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import ImageGridHero from "./Components/LandingPage/ImageGridHero";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <ImageGridHero />
      </div>
      
    </div>

  );
}
