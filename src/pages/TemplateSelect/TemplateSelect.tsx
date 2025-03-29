import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { Link } from "react-router-dom";

const TemplateSelect = () => {
	const { changeTemplate } = useMenuTemplate();

	return (
		<div>
			<button onClick={() => changeTemplate("classic")}>classic</button>
			<button onClick={() => changeTemplate("dark")}>dark</button>
			<button onClick={() => changeTemplate("blue")}>blue</button>
			<button onClick={() => changeTemplate("orange")}>orange</button>
			<button onClick={() => changeTemplate("green")}>green</button>

			<Link to={"/menu_editor"}>start</Link>
		</div>
	);
};

export default TemplateSelect;
