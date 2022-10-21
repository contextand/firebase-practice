import { signOut } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    signOut(appAuth)
      .then(() => {
        // sigh-out successful
        dispatch({ type: "logout" });
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        // An error happend
        setError(error.message);
        setIsPending(false);
      });
  };
  return { error, isPending, logout };
};
