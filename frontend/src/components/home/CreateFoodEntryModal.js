import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuthenticatedUser} from '../../providers/AuthProvider';
import {useEffect, useState} from 'react';
import {getAllMeals} from '../../dataAccess/meal';

const useStyles = makeStyles({
  formField: {marginTop: 15, marginBottom: 15},
  dialog: {marginTop: 25},
});

const validationSchema = yup.object({
  name: yup.string().required('Please enter product name'),
  calories: yup.number().moreThan(0).integer(),
  date: yup.date().required(),
  hours: yup.number().min(0).integer(),
  minutes: yup.number().min(0).integer(),
  meal: yup.string().required(),
  user: yup.string().required(),
});

export default function CreateFoodEntryModal({open, onClose, onCreate}) {
  const classes = useStyles();
  const user = useAuthenticatedUser();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getAllMeals().then(({success, data, error}) => {
      if (success) {
        setMeals(data.rows);
      } else {
        alert('Something went wrong', error);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: 'Milk',
      calories: 110,
      date: new Date().toISOString().slice(0, 10),
      hours: 9,
      minutes: 0,
      meal: 'user',
      user: user.id,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      onCreate(values);
    },
  });
  return (
    <Dialog className={classes.dialog} open={open} onClose={onClose}>
      <DialogTitle>Create FoodEntry</DialogTitle>
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
            label="Calories"
            id="calories"
            type="number"
            variant="outlined"
            name="calories"
            value={formik.values.calories}
            onChange={formik.handleChange}
            error={formik.touched.calories && formik.errors.calories}
            helperText={formik.errors.calories}
            fullWidth
            className={classes.formField}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="dialog"
              format="yyyy-MM-dd"
              maxDate={new Date()}
              margin="normal"
              id="date"
              label="Date"
              name="date"
              value={formik.values.date}
              onChange={value => {
                //reference: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd#:~:text=The%20simplest%20way%20to%20convert,getTimezoneOffset()%20*%2060000%20))%20.
                formik.setFieldValue('date', value.toISOString().split('T')[0]);
              }}
              inputVariant="outlined"
              error={formik.touched.date && formik.errors.date}
              helperText={formik.errors.date}
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={classes.formField}
            />
          </MuiPickersUtilsProvider>
          <TextField
            label="Hours"
            id="hours"
            type="number"
            variant="outlined"
            name="hours"
            value={formik.values.hours}
            onChange={formik.handleChange}
            error={formik.touched.hours && formik.errors.hours}
            helperText={formik.errors.hours}
            fullWidth
            className={classes.formField}
          />
          <TextField
            label="Minutes"
            id="minutes"
            type="number"
            variant="outlined"
            name="minutes"
            value={formik.values.minutes}
            onChange={formik.handleChange}
            error={formik.touched.minutes && formik.errors.minutes}
            helperText={formik.errors.minutes}
            fullWidth
            className={classes.formField}
          />
          {/* <TextField
            autoFocus
            label="Meal"
            id="meal"
            type="text"
            variant="outlined"
            name="meal"
            value={formik.values.meal}
            onChange={formik.handleChange}
            error={formik.touched.meal && formik.errors.meal}
            helperText={formik.errors.meal}
            fullWidth
            className={classes.formField}
          /> */}
          <Select
            label="Meal"
            name="meal"
            value={formik.values.meal}
            onChange={formik.handleChange}
            error={formik.touched.meal && formik.errors.meal}
            fullWidth
            className={classes.formField}
          >
            {meals &&
              meals.map(meal => (
                <MenuItem key={meal.id} value={meal.id}>
                  {meal.type}
                </MenuItem>
              ))}
          </Select>
          {user.role === 'admin' && (
            <TextField
              label="User"
              id="user"
              type="text"
              variant="outlined"
              name="user"
              value={formik.values.user}
              onChange={formik.handleChange}
              error={formik.touched.user && formik.errors.user}
              helperText={formik.errors.user}
              fullWidth
              className={classes.formField}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.formField}
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
