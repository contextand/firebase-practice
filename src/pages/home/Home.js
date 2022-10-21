import styles from "./Home.module.css";
import DiaryForm from "./DiaryForm";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid}></DiaryForm>
      </aside>
      <ul className={styles.content_list}>dairy list</ul>
    </main>
  );
}
