import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../../redux/companySlice.js";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setCompanies(response.data.companies));
      }
      try {
      } catch (error) {}
    };
    fetchCompanies();
  }, [dispatch]);

  return <div>useGetAllCompanies</div>;
};

export default useGetAllCompanies;
