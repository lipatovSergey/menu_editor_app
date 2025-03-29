import MainPage from "./pages/MainPage/MainPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SortingProvider } from "./context/SortingContext/SortingProvider";
import MenuEditor from "./components/MenuEditor/MenuEditor";
import { MenuTemplateProvider } from "./context/MenuTemplateContext/MenuTemplateProvider";
import TemplateSelect from "./pages/TemplateSelect/TemplateSelect";
import { DishesProvider } from "./context/DishesContext/DishesProvider";
import { SectionsProvider } from "./context/SectionsContext/SectionsProvider";

export default function App() {
	return (
		<MenuTemplateProvider>
			<SectionsProvider>
				<DishesProvider>
					<Router>
						<Routes>
							<Route path='/' element={<MainPage />} />

							<Route path='/templates' element={<TemplateSelect />} />

							<Route
								path='/menu_editor'
								element={
									<SortingProvider>
										<MenuEditor />
									</SortingProvider>
								}
							/>
						</Routes>
					</Router>
				</DishesProvider>
			</SectionsProvider>
		</MenuTemplateProvider>
	);
}
