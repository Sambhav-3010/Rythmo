import { MainLayout } from "@/components/MainLayout";
import { StudioContent } from "@/components/StudioContent";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Studio() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <MainLayout>
      {user && user.userType !== "artist" && navigate("/error")}
      <StudioContent />
    </MainLayout>
  );
}
