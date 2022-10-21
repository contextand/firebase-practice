import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  // 에러 정보 저장
  const [error, setError] = useState(null);
  // 현재 서버와 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null); // 아직 에러가 없다.
    setIsPending(true); // 통신을 진행중

    // 회원가입을 도와주는 함수, createUseWithEmailPassword
    // 성공적으로 실행되면 프로미스 객체를 반환하는 함수, 뒤에 then 이 붙는다.
    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; // 회원가입 완료시 사용자 정보를 가져오는
        // console.log(user);

        if (!user) {
          // 유저 정보가 존재하지 않으면 경고창 띄우고
          throw new Error("회원가입이 실패했다");
        }

        // 위 회원가입 때 닉네임을 저장하진 않고,
        // 회원가입이 완료된 회원에게 닉네임을 전달해서 정보를 업데이트 해야 함
        // 사용자 프로필을 업데이트 할 때 사용하는 메소드 updateProfile

        updateProfile(appAuth.currentUser, { displayName }) // 현재 로그인한 유저정보 전달
          .then(() => {
            // 프로미스 객체 반환. 실행이 잘 되면, 아래
            dispatch({ type: "login", payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            // 통신중 에러가 나면 에러 메시지 전달
            setError(err.message);
            setIsPending(false); // 통신은 완료되었으니 false
          });
      })
      .catch((err) => {
        // 통신중 에러가 나면 에러메시지
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, signup }; // 사용한 스테이트인 error, isPending, signup .. 등 세팅 _
};
