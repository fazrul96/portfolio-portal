import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Box, CssBaseline, Typography} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import {protectedRoutes, publicRoutes} from './routes/AppRoutes';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AppBarResponsive from './components/AppBar';
import DashboardLayoutWrapper from "./components/common/DashboardLayoutWrapper";
import {PRIVATE_NAVIGATION, PUBLIC_NAVIGATION} from "./config/navigationConfig";
import {ROUTE_HOME} from "./constants/AppRoutes";
import {WebSocketProvider} from "./context/WebSocketContext";

const drawerWidth = 240;
const App = () => {
	const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
	const [educations, setEducations] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const [projects, setProjects] = useState([]);
	const [skills, setSkills] = useState([]);
	const [error, setError] = useState(null);

	const navigation = isAuthenticated
		? user.email === 'mfazrul07@gmail.com'
			? [...PUBLIC_NAVIGATION, ...PRIVATE_NAVIGATION] // Add special navigation for test user
			: PUBLIC_NAVIGATION  // For authenticated users (excluding test user)
		: PUBLIC_NAVIGATION; // For non-authenticated users

	const customContent = (
		<Routes>
			<Route path={ROUTE_HOME} element={<HomePage projects={projects} educations={educations} certifications={certifications} skills={skills} error={error} />} />
			{publicRoutes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={route.component}
				/>
			))}

			{protectedRoutes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={<ProtectedRoute>{route.component}</ProtectedRoute>}
				/>
			))}
		</Routes>
	);
	return (
		<WebSocketProvider>
			<Router>
				<DashboardLayoutWrapper
					navigation={navigation}
					content={customContent}
				/>
				{/*<Box sx={{ display: 'flex' }}>*/}
				{/*    <CssBaseline />*/}
				{/*    <AppBarResponsive />*/}
				{/*</Box>*/}
			</Router>
		</WebSocketProvider>
	);
}

export default App;