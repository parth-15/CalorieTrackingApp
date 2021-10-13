import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  type: yup.string().required(),
  maxAllowed: yup.number().min(0).integer().required(),
});

const useStyles = makeStyles({
  formField: {marginTop: 15, marginBottom: 15},
  dialog: {marginTop: 25},
});

export default function EditMealModal({open, onClose, meal, onEdit}) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      type: meal.type,
      maxAllowed: meal.maxAllowed,
      id: meal.id,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      const mealData = values;
      onEdit(mealData);
    },
  });

  return (
    <Dialog className={classes.dialog} open={open} onClose={onClose}>
      <DialogTitle>Edit Meal</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            label="Type"
            id="type"
            type="text"
            variant="outlined"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && formik.errors.type}
            helperText={formik.errors.type}
            fullWidth
            className={classes.formField}
          />

          <TextField
            label="Max Allowed"
            id="maxAllowed"
            type="number"
            variant="outlined"
            name="maxAllowed"
            value={formik.values.maxAllowed}
            onChange={formik.handleChange}
            error={formik.touched.maxAllowed && formik.errors.maxAllowed}
            helperText={formik.errors.maxAllowed}
            fullWidth
            className={classes.formField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formField}
          >
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
