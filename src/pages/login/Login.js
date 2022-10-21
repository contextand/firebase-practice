import styles from "./Login.module.css";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState(""); // 데이터 관리
  const [password, setPassword] = useState(""); // 데이터 관리
  const { error, isPending, login } = useLogin();

  const handleData = (event) => {
    if (event.target.type === "email") {
      // 타입이 email 인 것에 이벤트가 발생하면 이메일 값 수정
      setEmail(event.target.value); // setEmail 로 세팅한 email 값이 인풋창이 입력되는
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // submit 의 기본 이벤트 블락킹, 페이지 리로딩을 불러일으키는 것 막기
    login(email, password);
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      {/* 전체 form 에 onSubmit을 달아 제출 함수 실행 */}
      <fieldset>
        <legend>로그인</legend>
        <label htmlFor="myEmail">email : </label>
        <input // 위 label 과 연결, input 의 id 값을 label 에 htmlFor 로 연결
          type="email"
          id="myEmail"
          required // 반드시 입력해야 하는 요소
          onChange={handleData}
          value={email} // 입력의 주도권을 사용자가 아닌 리액트로 가져간다? 위에 onChange 로 입력값에 변화를 주지 않으면 입력이 안되는,
          // state 에 input 의 value 값을 연결하면 input 값을 바꿀 수 있는 건 오직 state 만 가능
          // ui 가 원래 가지고 있는 기능을 중지하고, 새로 코드를 입혀 우리가 원하는 방향으로만 움직이게 하는 것
          // input에 입력 받는 값은 오직 input 의 value 로 연결된 email 뿐. 이를 수정하는 것도 setEmail 분.
          // ui 가 사용자와 인터렉션하는 방법을 리액트에 독점적으로 맡긴다.
          // 이는 신뢰 가능한 단일 출처는 다른 방법을 배제하고 오직 리액트 state 만 이용해 컴포넌트가 사용하는 데이터를 다루는 리액트 설계철학
        />
        <label htmlFor="myPassWord">password : </label>
        <input
          type="password"
          id="myPassWord"
          required
          onChange={handleData}
          value={password}
        />
        {!isPending && (
          <button type="submit" className={styles.btn}>
            로그인
          </button>
        )}
        {isPending && <strong>로그인 진행중...</strong>}
        {error && <strong>{error}</strong>}
      </fieldset>
    </form>
  );
}
