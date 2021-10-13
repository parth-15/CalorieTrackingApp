import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {useFormik} from 'formik';
import {useState} from 'react';
import * as yup from 'yup';

import {login} from '../../../dataAccess/auth';
import {useUpdateAuthenticatedUser} from '../../../providers/AuthProvider';
import CustomAlert from '../../common/Alert';

const validationSchema = yup.object({
  token: yup.string().required('This field cannot be empty'),
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const updateAuthenticatedUser = useUpdateAuthenticatedUser();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };
  const formik = useFormik({
    //hardcode token value for user here
    initialValues: {
      token: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      login(values).then(({success, user, error}) => {
        if (success) {
          localStorage.setItem('authToken', values.token);
          localStorage.setItem('user', JSON.stringify(user));
          updateAuthenticatedUser(user);
          handleOpenAlert('success', 'Login Successful');
        } else {
          handleOpenAlert('error', error);
        }
      });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="token"
                value={formik.values.token}
                onChange={formik.handleChange}
                error={formik.touched.token && formik.errors.token}
                helperText={formik.errors.token}
                variant="outlined"
                fullWidth
                id="token"
                label="Token"
                autoFocus
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Grid>
        </form>
      </div>
      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={() => setOpenAlert(false)}
      />
    </Container>
  );
}
