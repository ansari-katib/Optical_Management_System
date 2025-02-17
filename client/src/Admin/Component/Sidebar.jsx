import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  ShoppingCart,
  People,
  Inventory,
  BarChart,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Visibility,
  Add,
  Receipt,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get current path
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer
  const [productsOpen, setProductsOpen] = useState(false); // State for collapsible sub-menu
  const [customerOpen, setCustomerOpen] = useState(false); // State for collapsible sub-menu
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleProductsMenu = () => {
    setProductsOpen(!productsOpen);
  };

  const toggleCustomerMenu = () => {
    setCustomerOpen(!customerOpen);
  };

  const toggleInventoryMenu = () => {
    setInventoryOpen(!inventoryOpen);
  }

  const toggleOrderMenu = () => {
    setOrderOpen(!orderOpen);
  }


  const menuItems = [
    { text: "Generate Invoice", icon: <Receipt />, path: "/admin/invoice" },
    { text: "Logout", path: "/", onClick: handleLogout }
  ];

  const productSubItems = [
    { text: "View Products", icon: <Visibility />, path: "/admin/products/view" },
    { text: "Add Product", icon: <Add />, path: "/admin/products/add" }
  ];

  const customerSubItems = [
    { text: "View customers", icon: <Visibility />, path: "/admin/customers/view" },
    { text: "Add customer", icon: <Add />, path: "/admin/customers/add" }
  ];

  const inventorySubItems = [
    { text: "View inventory", icon: <Visibility />, path: "/admin/inventory/view" },
    { text: "Add inventory", icon: <Add />, path: "/admin/inventory/add" }
  ];

  const OrderSubItems = [
    { text: "View orders", icon: <Visibility />, path: "/admin/orders/view" },
    { text: "Add order", icon: <Add />, path: "/admin/orders/add" }
  ];

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6" sx={{ color: "#ffffff", borderBottom: 1, pb: 1 }}>
          Optical Admin
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>

          {/* Products Management with Sub-Menu */}
          <ListItem
            button
            onClick={toggleProductsMenu}
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#3C3D37",
                color: "#ECDFCC",
              },
            }}
          >
            <ListItemIcon>
              <Inventory sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Products Management" sx={{ fontSize: "0.875rem" }} />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {productSubItems.map((subItem, subIndex) => (
                <Link
                  to={subItem.path}
                  key={subIndex}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    sx={{
                      pl: 4,
                      color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      backgroundColor:
                        location.pathname === subItem.path ? "#3C3D37" : "transparent", // Keep background color when active
                      "&:hover": {
                        backgroundColor: "#3C3D37",
                        color: "#ECDFCC",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.text} sx={{ fontSize: "0.875rem" }} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>


          {/* Customer Management with Sub-Menu */}
          <ListItem
            button
            onClick={toggleCustomerMenu}
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#3C3D37",
                color: "#ECDFCC",
              },
            }}
          >
            <ListItemIcon>
              <People sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Customer Management" sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
            {customerOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={customerOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {customerSubItems.map((subItem, subIndex) => (
                <Link
                  to={subItem.path}
                  key={subIndex}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    sx={{
                      pl: 4,
                      color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      "&:hover": {
                        backgroundColor: "#3C3D37",
                        color: "#ECDFCC",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.text} sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          {/* Inventory Management with Sub-Menu */}
          <ListItem
            button
            onClick={toggleInventoryMenu}
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#3C3D37",
                color: "#ECDFCC",
              },
            }}
          >
            <ListItemIcon>
              <BarChart sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Inventory Management" sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
            {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {inventorySubItems.map((subItem, subIndex) => (
                <Link
                  to={subItem.path}
                  key={subIndex}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    sx={{
                      pl: 4,
                      color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      "&:hover": {
                        backgroundColor: "#3C3D37",
                        color: "#ECDFCC",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.text} sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          {/* Order Management with Sub-Menu */}
          <ListItem
            button
            onClick={toggleOrderMenu}
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#3C3D37",
                color: "#ECDFCC",
              },
            }}
          >
            <ListItemIcon>
              <ShoppingCart sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Order Management" sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
            {orderOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={orderOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {inventorySubItems.map((subItem, subIndex) => (
                <Link
                  to={subItem.path}
                  key={subIndex}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    sx={{
                      pl: 4,
                      color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      "&:hover": {
                        backgroundColor: "#3C3D37",
                        color: "#ECDFCC",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === subItem.path ? "#ffffff" : "#ffffff",
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.text} sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          {/* list items   */}

          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              onClick={item.onClick}
            >
              <ListItem
                component={"button"}
                sx={{
                  backgroundColor: location.pathname === item.path ? "#697565" : "inherit",
                  color: location.pathname === item.path ? "#ffffff" : "#ffffff",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#3C3D37",
                    color: "#ECDFCC",
                    "& .MuiListItemIcon-root": {
                      color: "#ECDFCC",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? "#ffffff" : "#ffffff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ fontSize: "0.875rem" }} /> {/* Adjusted font size */}
              </ListItem>
            </Link>
          ))}

        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mobile Drawer */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: "none" }, ml: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1E201E",
            color: "#ffffff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: 255,
            boxSizing: "border-box",
            backgroundColor: "#1E201E",
            color: "#ffffff",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
