import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCrousel from "./CategoryCrousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCrousel />
      <LatestJob />
      <Footer />
    </div>
  );
};

export default Home;
