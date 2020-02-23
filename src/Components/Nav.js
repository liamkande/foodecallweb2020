import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import MenuList from '@material-ui/core/MenuList'
import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1) * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class Nav extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >

      </Menu>
    );

    const renderMobileMenu = (

      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}

      >
       <MenuList className='mobile-nav'>
        <MenuItem style={{backgroundColor:'white'}}>
          <NavLink to="/about"><strong>About Us</strong></NavLink>
        </MenuItem>
        <MenuItem style={{backgroundColor:'white'}}>
          <NavLink to="/sign-up"><strong>Sign Up</strong></NavLink>
        </MenuItem>
         </MenuList>
      </Menu>

    );

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar  position="static" style={{backgroundColor:'transparent',   boxShadow: 'none',}}>
          <Toolbar className='nav' style={{paddingTop:'3%', paddingLeft:'2%', paddingRight:'5%'}}>
          <NavLink exact to="/" className='nav__logo'>
            <img src={logo} alt='logo' className='logoImg' style={{marginTop:'35px'}} />
           </NavLink>
            <div className='nav__tabs' style={{marginTop:'-4%'}}/>
            <div className={classes.sectionDesktop}>
              <div className='main-nav'>
                <NavLink to="/about">About Us</NavLink>
              </div>
              <div className='main-nav'>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </div>
              <div className='main-nav'>
                <NavLink to="/admin">Admin</NavLink>
              </div>

            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MenuIcon style={{color:'#E23E81'}}/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
      </MuiThemeProvider>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
