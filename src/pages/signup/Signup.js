import styles from "./Signup.module.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // displayName 은 파이어베이스에서 유저정보에 저장할 수 있는 속성 중 하나. 파이어베이스에 약속된 이름이므로 다른 변수명을 쓰지 말 것
  const { error, isPending, signup } = useSignup(); // 커스텀 훅의 리턴값 가져오기

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    } else if (event.target.type === "text") {
      setDisplayName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>

        <label htmlFor="myEmail">email : </label>
        <input
          type="email"
          id="myEmail"
          required
          onChange={handleData}
          value={email}
          autoComplete="username"
        />

        <label htmlFor="myPassWord">password : </label>
        <input
          type="password"
          id="myPassWord"
          required
          onChange={handleData}
          value={password}
          autoComplete="current-password"
        />

        <label htmlFor="myNickName">닉네임 : </label>
        <input
          type="text"
          id="myNickName"
          required
          onChange={handleData}
          value={displayName}
        />

        <button type="submit" className="btn">
          회원가입
        </button>
      </fieldset>
    </form>
  );
}
