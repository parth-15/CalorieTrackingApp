import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {
  useAuthenticatedUser,
  useUpdateAuthenticatedUser,
} from '../../providers/AuthProvider';
import {Link} from 'react-router-dom';
import InviteFriendModal from '../home/InviteFriendModal';
import {useState} from 'react';
import {inviteFriend} from '../../dataAccess/auth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  box: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.appBarSpacer,
}));

export default function Navbar() {
  const classes = useStyles();
  const updateAuthenticatedUser = useUpdateAuthenticatedUser();
  const authenticatedUser = useAuthenticatedUser();
  const [inviteFriendModalOpen, setInviteFriendModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    updateAuthenticatedUser({});
  };

  const handleInviteFriendModal = userInput => {
    inviteFriend(userInput).then(({success, data, error}) => {
      if (success) {
        handleOpenAlert('success', 'created successfully');
        //Do not remove following console message
        console.log(`Token: ${data.token}`);
        console.log(`Password: ${data.password}`);
        setInviteFriendModalOpen(false);
      } else {
        console.error(error);
        handleOpenAlert('error', `Error ${error}`);
      }
    });
  };

  const handleEdit = () => {
    setInviteFriendModalOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box className={classes.box}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Box>

          {['user', 'admin'].includes(authenticatedUser.role) && (
            <Button color="inherit" onClick={() => handleEdit()}>
              Invite a Friend
            </Button>
          )}

          <InviteFriendModal
            open={inviteFriendModalOpen}
            onClose={() => setInviteFriendModalOpen(false)}
            onEdit={handleInviteFriendModal}
            openAlert={openAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
            setOpenAlert={setOpenAlert}
          />

          {authenticatedUser.role === 'admin' && (
            <Button color="inherit" component={Link} to="/admin">
              Admin Panel
            </Button>
          )}

          {['user', 'admin'].includes(authenticatedUser.role) && (
            <Button color="secondary" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer}></div>
    </div>
  );
}
