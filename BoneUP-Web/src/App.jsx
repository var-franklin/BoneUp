import React from "react";
import { Route, Routes } from "react-router-dom";


import Home from "./pages/student/Home";
import FishGuide from "./pages/student/FishGuide";
import Tools from "./pages/student/Tools";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/tools" element={<Tools/>} />
				<Route path="/fish-guide" element={<FishGuide/>} />
			</Routes>
		</div>
	);
};

export default App;