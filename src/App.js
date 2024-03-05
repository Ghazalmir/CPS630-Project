// Libraries
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import AdDetails from "./pages/ads/adDetails";
import PageNotFound from './pages/pageNotFound';
import LoggedInNavbar from './components/navbars/LoggedInNavbar.js';
import LoggedOutNavbar from './components/navbars/LoggedOutNavbar.js';
// Styling 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {

	const logged_in = true;

	return (
		<Router>
		<div>
		
		{ /* Some sort of var that determines which version of navbar is rendered */}
		{logged_in ? <LoggedInNavbar /> : <LoggedOutNavbar />}

			<Routes>
        {/* Add the actual main page once you have it */}
        <Route path="/" element={<AdDetails />} />
				<Route path="/AdDetails" element={<AdDetails />} />
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