import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "@/components/shared";

const RootLayout = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoading && !user.id) {
      navigate("/sign-in");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
