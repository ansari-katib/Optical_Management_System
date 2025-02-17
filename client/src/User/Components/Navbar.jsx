import React, { useState, useEffect } from 'react';
import { FaEye, FaTruck, FaSignInAlt, FaMapMarkerAlt, FaHeadphones, FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import UserPopupCard from './UserPopupCard'; // Import the new component
import { Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // To handle the anchor element for the menu
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the Drawer
  const [showTopNavbar, setShowTopNavbar] = useState(true); // State to toggle visibility of top navbar
  const [activeMenuItem, setActiveMenuItem] = useState(null); // Track the active menu item
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile

  // Check authentication status and user details from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const authStatus = localStorage.getItem('isAuthenticated');

    if (authStatus && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
    setAnchorEl(null); // Close the menu after logout
    setActiveMenuItem(null); // Reset active menu item
    navigate("/");
  };

  // Handle the toggle for top navbar
  const handleMenuToggle = () => {
    setShowTopNavbar(!showTopNavbar);
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item); // Set the active menu item
    setShowTopNavbar(false);  // Hide top navbar when a menu item is clicked
    navigate(item.url);       // Navigate to the selected menu item's URL
  };

  const items2 = [
    {
      text: <img src={Logo} alt="Logo" className="h-20 w-20" />, // Display logo as an image
      url: '/'
    },
    { text: "EYEGLASSES", url: '/eye-glasses' },
    { text: "SUNGLASSES", url: '/sun-glasses' },
    { text: "POWER SUNGLASSES", url: '/power-glasses' },
    { text: "COMPUTER GLASSES", url: '/computer-glasses' },
    { text: "READING GLASSES", url: '/reading-glasses' },
    { text: "CONTACT LENSES", url: '/contact-lenses' },
    { text: "ACCESSORIES", url: '/accessories' },
    { text: "BRANDS", url: '/brand' },
  ];

  const items = [

    { icon: <FaEye />, name: "Eye Testing", link: '/eye-testing' },
    { icon: <FaTruck />, name: "Shipping", link: '/shipping' },
    { icon: <FaMapMarkerAlt />, name: "Find Store", link: '/find-store' }
  ];

  return (
    <>
      {/* Conditionally render top navbar only if it's not mobile view */}
      {!isMobile && showTopNavbar && (
        <div className="bg-gray-800 pr-10 pl-10 text-white p-1 flex justify-between items-center">
          <div className="flex gap-3 justify-center items-center">
            <FaHeadphones />
            <p>
              Need Help?{' '}
              <Link to="/" className="text-amber-400 hover:underline">
                Call 0000-000-0000
              </Link>
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex items-center border-2 border-gray-600 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for the glasses"
                className="p-2 text-black bg-white rounded-l-md focus:outline-none w-72"
              />
              <FaSearch className="text-black bg-gray-200 p-2 w-10 h-10 cursor-pointer rounded-r-md" />
            </div>
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center text-xl hover:underline hover:text-gray-400"
                onClick={() => handleMenuItemClick(item)} // Call handleMenuItemClick
              >
                <div className="mr-2">{item.icon}</div>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="relative flex items-center">
                <FaUserCircle
                  className="text-2xl cursor-pointer"
                  onClick={handleUserMenuClick} // Open the menu when clicked
                />
                {/* UserPopupCard is displayed when anchorEl is not null */}
                <UserPopupCard
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  user={user}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <Link to="/signin" className="flex items-center text-xl hover:underline hover:text-gray-400">
                <FaSignInAlt />&nbsp;<Typography>Sign in</Typography>
              </Link>
            )}

            {/* Show Cart icon only if authenticated */}
            {isAuthenticated && (
              <Link to="/selected-cart" className="flex items-center text-xl hover:underline hover:text-gray-400">
                <FaShoppingCart className="text-2xl" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Sticky Navbar */}
      <AppBar position="sticky" color="default" className="shadow-md border-b-2 border-gray-300">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuToggle} sx={{ display: isMobile ? 'block' : 'none' }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
            {!isMobile && items2.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-black text-sm flex items-center justify-center hover:underline hover:text-gray-500"
                onClick={() => handleMenuItemClick(item)} // Call handleMenuItemClick
              >
                <span>{item.text}</span>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleMenuToggle}>
        <List>
          {items2.map((item, index) => (
            <ListItem button key={index} onClick={() => handleMenuItemClick(item)}>
              <Typography>{item.text}</Typography>
            </ListItem>
          ))}
          <List>
            {items.map((item, index) => (
              <ListItem button key={index} onClick={() => handleMenuItemClick(item)}>
                <div className="mr-2">{item.icon}</div>
                <Typography>{item.name}</Typography>
              </ListItem>
            ))}
          </List>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
