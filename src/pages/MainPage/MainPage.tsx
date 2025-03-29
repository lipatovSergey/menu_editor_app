import { Link } from "react-router-dom";

export default function MainPage() {
	return (
		<div>
			<Link to={"/templates"}>Create New Menu</Link>
			<button>My Menues</button>
		</div>
	);
}
