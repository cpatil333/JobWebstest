import React from "react";
import Navbar from "./shared/Navbar";
import FilterCards from "./FilterCards";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.jobs);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCards />
          </div>
          {allJobs?.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs?.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
