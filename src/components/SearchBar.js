import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles'; // Import alpha for background color opacity

import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  flexGrow: 5, // Adjust the width here
  marginLeft: theme.spacing(35), // Adjust the margin here
  width: 'auto',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`, { state: { searchTerm } });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
        <Toolbar>
          <Search>
          {/* <SearchIconWrapper> */}

            <StyledInputBase
              placeholder="Search Posts..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              onClick={handleSearch}
              sx={{ color: 'inherit' }}
            >
              <SearchIcon />
            </IconButton>
          {/* </SearchIconWrapper> */}

          </Search>
        </Toolbar>
    </div>
  );
};

export default SearchBar;
