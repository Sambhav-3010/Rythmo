import { MainLayout } from "@/components/MainLayout"
import { ArtistDashboardContent } from "@/components/ArtistDashboardContent"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function ArtistDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <MainLayout>
      {user && user.userType !== "artist" && navigate("/error")}
      <ArtistDashboardContent />
    </MainLayout>
  );
}
