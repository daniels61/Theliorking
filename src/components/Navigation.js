import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Input } from "@mui/material";
import axios from "axios";
import DashBord from "./DashBord";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "./NavBar";

class Navigation extends React.Component {
  state = { query: "", results: [], isLoggedIn: false };

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    const url = "http://localhost:5000/loginStatus";
    const data = {
      cookie: document.cookie
    };
    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") {
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ isLoggedIn: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      // <AppBar position="static" style={{ backgroundColor: "#34515e" }}>
      //   <Toolbar>
      //     {/* Move "Home" and "New Post" buttons here */}
          
      //     <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      //       <MenuIcon />
      //       <Typography>
      //     <NavLink
      //         to="/About"
      //         className="active"
      //         style={{
      //           textDecoration: "none",
      //           color: "white",
      //           marginRight: "15px",
      //         }}
      //       >
      //         About
      //       </NavLink>
      //       <NavLink
      //         to="/"
      //         className="active"
      //         style={{
      //           textDecoration: "none",
      //           color: "white",
      //           marginRight: "15px",
      //         }}
      //       >
      //         Home
      //       </NavLink>

      //       <NavLink
      //         to="/newpost"
      //         className="active"
      //         style={{
      //           textDecoration: "none",
      //           color: "white",
      //           marginRight: "15px",
      //         }}
      //       >
      //         New Post
      //       </NavLink>
      //     </Typography>
      //     </IconButton>
         
      //     <SearchBar />
      //     <div style={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
      //       {!this.state.isLoggedIn ? (
      //         <>
      //           <Button color="inherit">
      //             <NavLink
      //               to="/login"
      //               className="active"
      //               style={{ textDecoration: "none", color: "white" }}
      //             >
      //               Login
      //             </NavLink>
      //           </Button>
      //           <Button color="inherit">
      //             <NavLink
      //               to="/register"
      //               className="active"
      //               style={{ textDecoration: "none", color: "white" }}
      //             >
      //               Register
      //             </NavLink>
      //           </Button>
      //         </>
      //       ) : (
      //         <DashBord />
      //       )}
      //     </div>
      //   </Toolbar>
      // </AppBar>
      <Navbar/>
    );
  }
}

export default Navigation;
