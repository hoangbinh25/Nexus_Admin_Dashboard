import { ERouter } from "@/enums/route";
import { Navigate } from "@tanstack/react-router";

const Index = () => {
  return <Navigate to={`${ERouter.LOGIN}`} replace />;
};

export default Index;
