import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companySlice.js";

const getCompanyById = ({ companyId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      const response = await axios.get(
        `${COMPANY_API_END_POINT}/get/${companyId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
      }
      try {
      } catch (error) {}
    };
    fetchSingleCompany();
  }, [dispatch]);

  return <div>useGetAllJobs</div>;
};

export default getCompanyById;
