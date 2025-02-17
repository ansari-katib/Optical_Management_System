import React from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

const UserPopupCard = ({ anchorEl, open, onClose, user, onLogout }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '250px',
        },
      }}
    >
      <div className="flex justify-center py-4">
        <FaUserCircle className="text-4xl text-gray-600" />
      </div>

      {/* User info */}
      <MenuItem disabled>
        <strong>{user?.name}</strong>
      </MenuItem>
      <MenuItem disabled>{user?.email}</MenuItem>
      
      <Divider />

      {/* Options */}
      <MenuItem onClick={() => console.log('View Profile')}>View Profile</MenuItem>
      <MenuItem onClick={() => console.log('Settings')}>Settings</MenuItem>
      <Divider />
      <MenuItem onClick={onLogout} className="text-red-500">
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserPopupCard;
