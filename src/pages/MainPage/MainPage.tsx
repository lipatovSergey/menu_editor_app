import { Link } from "react-router-dom";
import styles from "./MainPage.module.css";

export default function MainPage() {
	return (
		<div className={styles.mainPage}>
			<Link className={styles.createMenuBtn} to={"/templates"}>
				Create New Menu
			</Link>
		</div>
	);
}
