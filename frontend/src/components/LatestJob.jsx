import React from "react";
import LatestJobCards from "../components/LatestJobCards";
import { useSelector } from "react-redux";

//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJob = () => {

  const { allJobs } = useSelector((store) => store.jobs);
  return (
    <div className="max-w-6xl mx-auto my-20">
      <h1 className="text-4xl font-bold my-2">
        <span className="text-purple-600">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-5 my-5">
        {allJobs?.length >= 0 ? (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job?._id} job={job} />)
        ) : (
          <span>No Jobs Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJob;
