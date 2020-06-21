/** @jsx jsx */

import { jsx } from "@emotion/core";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory, Link } from "react-router-dom";
import { logoutAsync } from "../redux/action";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listMenu = () => {
    return ["New Topic", "Search", "Logout"];
  };

  const handleClickMenu = (key) => {
    switch (key.toLowerCase()) {
      case "new topic":
        history.push("/create-topic");
        break;

      case "search":
        history.push("/search-topic");
        break;

      case "logout":
        dispatch(logoutAsync());
        history.replace("/");
        break;

      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {listMenu().map((val) => (
                <MenuItem
                  key={val}
                  onClick={() => {
                    handleClose();
                    handleClickMenu(val);
                  }}
                >
                  {val}
                </MenuItem>
              ))}
            </Menu>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              css={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              Forum
            </Link>
          </Typography>

          <Hidden smDown>
            {listMenu().map((val) => (
              <Button
                color="inherit"
                onClick={() => {
                  handleClickMenu(val);
                }}
                key={val}
              >
                {val}
              </Button>
            ))}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};
