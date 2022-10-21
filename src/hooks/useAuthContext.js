import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // AuthContext 에서 반환하는 state 값과 dispatch 함수가 들어있음
  return context;
};
