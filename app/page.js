import getUnits from "./api/getUnits";
import ListMonsters from "./components/listMonsters";
import styles from "./page.module.css";

export default async function Home() {
  const units_list = await getUnits()

  return (
    <main className={styles.main}>
      <ListMonsters list={units_list} />
    </main>
  );
}
