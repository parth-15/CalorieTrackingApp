import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {getReportOfUser} from '../../dataAccess/userReport';
import {useAuthenticatedUser} from '../../providers/AuthProvider';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles({
  container: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    marginBottom: 25,
  },
});

export default function UserReport() {
  const classes = useStyles();
  const user = useAuthenticatedUser();
  const [reportingData, setReportingData] = useState([]);

  useEffect(() => {
    getReportOfUser(user.id).then(({success, data, error}) => {
      if (success) {
        setReportingData(data.entries);
      } else {
        console.error(error);
      }
    });
  }, []);

  return (
    <>
      <Grid className={classes.container} container justifyContent="center">
        <Grid item className={classes.item}>
          <Typography component="h1" variant="h5">
            Report
            <AssessmentIcon />
          </Typography>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight: 'bold'}}>Date</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  Total Calories
                </TableCell>
                <TableCell style={{fontWeight: 'bold'}}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{alignContent: 'center'}}>
              {reportingData &&
                reportingData.map(entry => (
                  <TableRow key={entry._id}>
                    <TableCell>{entry._id}</TableCell>
                    <TableCell>{entry.sum}</TableCell>
                    <TableCell>
                      {entry.sum > user.maxCalories && (
                        <IconButton color="primary">
                          <BatteryChargingFullIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
