import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "../../redux/jobSlice";

//const randomJobs = [1, 2, 3, 4, 5, 6];

const Browser = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.jobs);
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="text-bold text-xl my-10">
          Search Result ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs?.length >= 0 ? (
            allJobs?.map((job) => <Job key={job?._id} job={job} />)
          ) : (
            <span>No Jobs Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browser;
