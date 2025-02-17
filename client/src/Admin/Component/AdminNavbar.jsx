import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Box,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Receipt, Visibility, Add } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";

const AdminNavbar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  // Use MediaQuery hook to check if screen size is mobile/tablet
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");

  const location = useLocation(); // Get the current location

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const dashboard = [{ text: "Dashboard", icon: <Dashboard />, path: "/" }]

  const mainItems = [{ text: "Generate Invoice", icon: <Receipt />, path: "/admin/invoice" }];

  const menuSections = [
    {
      ParentPage: { text: "Customer" , path:"/admin/customers"},
      items: [
        { text: "View Customers", icon: <Visibility />, path: "/admin/customers/view" },
        { text: "Add Customer", icon: <Add />, path: "/admin/customers/add" }
      ]
    },
    {
      ParentPage:{text:"Inventory" , path:"/admin/inventory"},
      items: [
        { text: "View Inventory", icon: <Visibility />, path: "/admin/inventory/view" },
        { text: "Add Inventory", icon: <Add />, path: "/admin/inventory/add" }
      ]
    },
    {
      ParentPage: {text:"Orders" , path:"/admin/orders"},
      items: [
        { text: "View Orders", icon: <Visibility />, path: "/admin/orders/view" },
      ]
    }
  ];

  // Function to check if the item path matches the current route
  const isActiveRoute = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E201E", marginBottom: 2, padding: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Logo" className="h-12 w-14 bg-white rounded-xl" />
        </Typography>

        {/* Only show the menu for mobile or tablet */}
        {isMobileOrTablet && (
          <>
            {/* Open/Close Menu Icon */}
            <IconButton onClick={menuAnchor ? handleMenuClose : handleMenuOpen} color="inherit">
              {menuAnchor ? <CloseIcon /> : <MenuIcon />}
            </IconButton>


            {/* Dropdown Menu */}
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
              {mainItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={handleMenuClose}
                  sx={{
                    backgroundColor: isActiveRoute(item.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </MenuItem>
              ))}



              {/* Dynamic Submenus */}
              {menuSections.map((section, index) => (
                <Box key={index}>
                  <MenuItem onClick={() => setSubmenuOpen(submenuOpen === section.label ? null : section.label)}>
                    <ListItemText primary={section.label} />
                  </MenuItem>

                  {submenuOpen === section.label &&
                    section.items.map((subItem, subIndex) => (
                      <MenuItem
                        key={subIndex}
                        sx={{
                          pl: 4,
                          backgroundColor: isActiveRoute(subItem.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
                        }}
                        onClick={handleMenuClose}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </MenuItem>
                    ))}
                </Box>
              ))}
            </Menu>
          </>
        )}

        {/* Desktop Menu (Always visible on larger screens) */}
        {!isMobileOrTablet && (
          <>
            {
              dashboard.map((item, index) => (
                <div
                  key={index}
                  className="text-white p-2 rounded-lg"
                  style={{
                    backgroundColor: isActiveRoute(item.path) ? "gray" : "green",
                  }}
                >
                  <a href={item.path}>{item.text}</a>
                </div>
              ))
            }

            {menuSections.map((section, index) => (
              <div key={index} className="flex p-2 bg-gray-400 m-2 rounded-lg" >
                <a href={section.ParentPage.path} >{section.ParentPage.text}</a>
              </div>
            ))}

            {mainItems.map((item, index) => (
              <div
                key={index}
                className="bg-yellow-500 text-white p-2 rounded-lg"
                style={{
                  backgroundColor: isActiveRoute(item.path) ? "gray" : "green",
                }}
              >
                <a href={item.path}>{item.text}</a>
              </div>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
