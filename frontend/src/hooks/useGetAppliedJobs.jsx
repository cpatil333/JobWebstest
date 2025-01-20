import { APPLICATION_API_END_POINT } from "../utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from "../../redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.jobs);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });

      console.log(response.data);
      if (response.data.success) {
        dispatch(setAllAppliedJobs(response.data.application));
      }
      try {
      } catch (error) {}
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
