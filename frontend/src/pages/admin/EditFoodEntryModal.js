import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {useFormik} from 'formik';
import * as yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {useEffect, useState} from 'react';
import {getAllMeals} from '../../dataAccess/meal';

const useStyles = makeStyles({
  formField: {marginTop: 15, marginBottom: 15},
});

const validationSchema = yup.object({
  name: yup.string().required('Please enter product name'),
  calories: yup.number().moreThan(0).integer(),
  date: yup.date().required(),
  hours: yup.number().min(0).integer(),
  minutes: yup.number().min(0).integer(),
  //   meal: yup.string().required(),
  //   user: yup.string().required(),
});

export default function EditFoodEntryModal({open, onClose, foodEntry, onEdit}) {
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

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: foodEntry.name,
      calories: foodEntry.calories,
      date: foodEntry.date,
      hours: parseInt(foodEntry.time / 60),
      minutes: parseInt(foodEntry.time % 60),
      meal: foodEntry.meal.id,
      user: foodEntry.user.id,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
      onEdit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Food Entry</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            label="Name"
            id="name"
            name="name"
            type="text"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.errors.name}
            className={classes.formField}
          />
          <TextField
            label="Calories"
            id="calories"
            name="calories"
            type="text"
            variant="outlined"
            fullWidth
            value={formik.values.calories}
            onChange={formik.handleChange}
            error={formik.touched.calories && formik.errors.calories}
            helperText={formik.errors.calories}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.formField}
          >
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
