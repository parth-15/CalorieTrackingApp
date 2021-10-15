import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import {useFormik} from 'formik';
import {useState} from 'react';
import * as yup from 'yup';
import {useAuthenticatedUser} from '../../providers/AuthProvider';
import CustomAlert from '../common/Alert';

const useStyles = makeStyles({
  formField: {marginTop: 15, marginBottom: 15},
  dialog: {marginTop: 25},
});

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
});

export default function InviteFriendModal({
  open,
  onClose,
  onEdit,
  openAlert,
  alertSeverity,
  alertMessage,
  setOpenAlert,
}) {
  const classes = useStyles();
  const authenticatedUser = useAuthenticatedUser();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: 'user',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, {resetForm}) => {
      onEdit(values);
      resetForm();
    },
  });
  return (
    <>
      <Dialog className={classes.dialog} open={open} onClose={onClose}>
        <DialogTitle>Invite a Friend</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              label="Name"
              id="name"
              type="text"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.errors.name}
              fullWidth
              className={classes.formField}
            />

            <TextField
              label="Email"
              id="email"
              type="text"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.errors.email}
              fullWidth
              className={classes.formField}
            />

            <Select
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && formik.errors.role}
              fullWidth
              className={classes.formField}
            >
              <MenuItem value="user">User</MenuItem>
              {authenticatedUser.role === 'admin' && (
                <MenuItem value="admin">Admin</MenuItem>
              )}
            </Select>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.formField}
            >
              Invite
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </>
  );
}
