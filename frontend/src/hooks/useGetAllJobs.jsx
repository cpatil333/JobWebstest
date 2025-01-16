import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      const response = await axios.get(`${JOB_API_END_POINT}/get`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        dispatch(setAllJobs(response.data.jobs));
      }
      try {
      } catch (error) {}
    };
    fetchAllJobs();
  }, [dispatch]);

  return <div>useGetAllJobs</div>;
};

export default useGetAllJobs;
