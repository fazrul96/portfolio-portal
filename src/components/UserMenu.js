import React from 'react';
import { Menu, MenuItem, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GENERAL_SETTINGS } from '../constants/AppConstants';

const MenuTypography = ({ text }) => (
  <Typography textAlign="center">{text}</Typography>
);

const AuthenticatedMenu = ({ user, handleCloseUserMenu, logout }) => (
	<>
		<MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
	        <MenuTypography text={user.name} />
		</MenuItem>
		<MenuItem onClick={handleCloseUserMenu} component={Link} to="/settings">
	        <MenuTypography text={GENERAL_SETTINGS[1]} />
		</MenuItem>
		<Divider />
		<MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
	        <Typography textAlign="center" style={{ color: 'red' }}>Logout</Typography>
		</MenuItem>
	</>
);

const NonAuthenticatedMenu = ({ loginWithRedirect }) => (
	<MenuItem onClick={loginWithRedirect}>
		<MenuTypography text="Login" />
	</MenuItem>
);

const UserMenu = ({ anchorElUser, handleCloseUserMenu }) => {
    const { isAuthenticated, user, loginWithRedirect,  logout } = useAuth0();

	return (
		<Menu
	        id="menu-appbar"
	        anchorEl={anchorElUser}
	        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
	        keepMounted
	        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
	        open={Boolean(anchorElUser)}
	        onClose={handleCloseUserMenu}
		>
		    {isAuthenticated ? (
	            <AuthenticatedMenu user={user} handleCloseUserMenu={handleCloseUserMenu} logout={logout} />
		    ) : (
	            <NonAuthenticatedMenu loginWithRedirect={loginWithRedirect} />
		    )}
		</Menu>
	);
};

export default UserMenu;