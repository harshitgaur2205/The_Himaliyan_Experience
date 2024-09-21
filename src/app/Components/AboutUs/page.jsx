import React from "react";
import ShuffleCards from "./ShuffleCards";

const page = () => {
  return (
    <div className="about ">
      <div className="hero">
        <div className="part1">
            <h1>This is the About us page </h1>
            <ShuffleCards className="shuffle" />
        </div>
      </div>
    </div>
  );
};

export default page;
