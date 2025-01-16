import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "../../../redux/companySlice.js";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const registeredCompany = async () => {
    try {
      const responses = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (responses.data.success) {
        dispatch(setSingleCompany(responses.data.company));
        toast.success(responses?.data?.message);
        const companyId = responses?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to your company name? you can change this later
          </p>
        </div>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button varient="outline" onClick={registeredCompany}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
