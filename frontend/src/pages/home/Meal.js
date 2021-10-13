import {Grid, makeStyles, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {getAllMeals} from '../../dataAccess/meal';
import MealTable from '../../components/home/MealTable';
import CustomAlert from '../../components/common/Alert';

const useStyles = makeStyles(() => ({
  grid: {
    display: 'flex',
    marginTop: 100,
    alignItems: 'center',
  },
  table: {
    marginTop: 50,
  },
}));

export default function Meal() {
  const classes = useStyles();
  const [meals, setMeals] = useState([]);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchMeals = () => {
    getAllMeals().then(({success, data, error}) => {
      if (success) {
        setMeals(data.rows);
      } else {
        console.log('error', error);
      }
    });
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  return (
    <div>
      <Grid className={classes.grid} container justifyContent="center">
        <Typography variant="h5">Manage Meals</Typography>
      </Grid>

      <Grid className={classes.table} container justifyContent="center">
        <Grid item>
          <MealTable
            meals={meals}
            handleOpenAlert={handleOpenAlert}
            fetchMeals={fetchMeals}
          />
        </Grid>
      </Grid>
      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </div>
  );
}
