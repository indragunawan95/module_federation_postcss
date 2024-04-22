import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Header from "homeMFE/Header";
// import Footer from "home/Footer";

const App = () => (
	<div>
		<Header />
		<div className="my-10">PDP Page Content Test Kodok</div>
		{/* <Footer /> */}
	</div>
);
ReactDOM.render(<App />, document.getElementById("app"));
