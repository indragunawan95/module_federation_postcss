import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Header from "home/Header";
import Footer from "home/Footer";

const App = () => (
	<div>
		<Header />
		<div className="my-10">My Home Page Content</div>
		<Footer />
	</div>
);
ReactDOM.render(<App />, document.getElementById("app"));
