import { ERouter } from "@/enums/route";
import { Navigate } from "react-router-dom";

const Index = () => {
  return <Navigate to={ERouter.LOGIN} replace />;
};

export default Index;
