import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="text-2xl mx-auto px-4 py-4 rounded-full bg-gray-300 text-red-700 font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-7xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-purple-600">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas est
          quis, harum ad temporibus.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
          />
          <Button className="rounded-r-full bg-purple-600">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
