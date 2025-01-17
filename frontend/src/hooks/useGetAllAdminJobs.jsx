import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../../redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setAllAdminJobs(response.data.jobs));
      }
      try {
      } catch (error) {}
    };
    fetchAllAdminJobs();
  }, [dispatch]);

  return <div>useGetAllJobs</div>;
};

export default useGetAllAdminJobs;
