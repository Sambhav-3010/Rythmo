import { MainLayout } from "@/components/MainLayout"
import { CollectionContent } from "@/components/CollectionContent"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Collection() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <MainLayout>
      {user && user.userType === "artist" && navigate("/error")}
      <CollectionContent />
    </MainLayout>
  );
}
