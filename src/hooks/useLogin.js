import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  // 에러 정보 저장
  const [error, setError] = useState(null);
  // 현재 서버와 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null); // 아직 에러가 없다.
    setIsPending(true); // 통신을 진행중

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "login", payload: user });
        setError(null);
        setIsPending(false);
        if (!user) {
          throw new Error("회원가입이 실패했다");
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, login };
};
