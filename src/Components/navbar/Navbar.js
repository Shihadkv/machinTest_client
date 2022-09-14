import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const { user, dispatch } = useContext(AuthContext);


  const handleClick = () => {
    setClick(true);
    localStorage.clear();
    dispatch({ user: null });

    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "red" }}>
      <AppBar position="static" sx={{boxShadow:"none"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> MY NOTES</Link>
          </Typography>

          {user && !click ? (
            <>
              <Button color="inherit">{user.name}</Button>
              <Button color="inherit" onClick={handleClick}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              {" "}
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
