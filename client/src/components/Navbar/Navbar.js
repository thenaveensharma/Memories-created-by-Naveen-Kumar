import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./style.js";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { useHistory ,useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';


const Navbar = () => {
  const dispatch=useDispatch();
  const history=useHistory();
  const location=useLocation();
  const logOut=()=>{
    dispatch({type:'LOGOUT'})
    googleLogout();
    history.push('/auth');
    setUser(null);

  }
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    const token=user?.token;
    if(token && !token.includes('.com')){
      const decodedToken=decode(token);
      if(decodedToken.exp * 1000< new Date().getTime()){
        //logout
        logOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button 
            variant="contained"
            color="secondary"
            size="small"
            onClick={logOut}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
