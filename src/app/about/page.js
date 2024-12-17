import React from "react";
import HeroSection from "./components/HeroSection"
import MissionSection from "./components/MissionSection";
import TeamSection from "./components/TeamSection";

const MainContent = () => {
  return (
    <div>
      <HeroSection/>
    <div>
      <div>
        

        {/* Mission Section */}
        <MissionSection />

        {/* Team Section */}
        <TeamSection />
      </div>
    </div>
    </div>
  );
};

export default MainContent;
