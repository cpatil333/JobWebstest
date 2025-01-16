import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

//const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  const { allJobs } = useSelector((store) => store.jobs);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="text-bold text-xl my-10">
          Search Result ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs?.length >= 0 ? (
            allJobs
              ?.slice(0, 6)
              .map((job) => <Job key={job.id} job={job} />)
          ) : (
            <span>No Jobs Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
