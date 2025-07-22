import { MainLayout } from "@/components/MainLayout";
import { LibraryContent } from "@/components/LibraryContent";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <MainLayout>
      {user && user.userType === "artist" && navigate("/error")}
      <LibraryContent />
    </MainLayout>
  );
}
