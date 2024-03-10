// Libraries
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import AdDetails from "./pages/ads/adDetails";
import PageNotFound from './pages/pageNotFound';
import Navbar from './components/navbars/Navbar.js';
import NewAdForm from './pages/ads/newAdForm';
import HomePage from './pages/ads/homePage.js';
import MessagePanel from './components/messages/MessagePanel.js';
import Profile from './components/profile/Profile.js';

// Styling 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {

	const logged_in = false;
	// This is menat to mock an existing ad, will be replaced when developing the backend
		var vals = {
			title: "title 11", 
			price: 10, 
			description: "description 1",
			category: 1,
			images: [],
			onCampus: false,
			street: "street 1",
			city: "city 1", 
			country: "country 1",
			isAvailable: true,
		};
	return (
		<Router>
		<div>
		
		{ /* Some sort of var that determines which version of navbar is rendered */}
		<Navbar logged_in={logged_in} />
		<Routes>
        {/* Add the actual main page once you have it */}
        	<Route path="/" element={<HomePage />} />
			<Route path="/AdDetails" element={<AdDetails />} />
			<Route path="/NewAd" element={<NewAdForm isEditForm={false}/>} />
			<Route path="/EditAd" element={<NewAdForm vals={vals} isEditForm={true}/>} />
			<Route path="/Messages" element={<MessagePanel />} />
			<Route path="/Profile" element={<Profile />} />
			<Route path="*" element={<PageNotFound />} />
			</Routes>
      {/* Add the componenet once you have it
			<Footer />
      */}
		</div>
		</Router>
	);
}


export default App;