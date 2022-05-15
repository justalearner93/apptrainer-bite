import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';


function App() {
  return (
	<Router>
   	 	<div className="App">
      			
				<Navbar />
			<Routes>
				<Route path="/" exact element= {<Home/>}/>
				<Route path="/customer" element ={<CustomerList/>}/>
				<Route path="/training" element ={<TrainingList/>}/>
				<Route path="/calendar" element={<Calendar/>} />
			</Routes>
				
		</div>
	</Router>	
  );
}

const Home = () => (
	<div>
		<h1>Personal trainer</h1>
	</div>
);

export default App;
