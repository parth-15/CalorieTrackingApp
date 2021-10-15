import {
  Container,
  Grid,
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
import {getSecondReportOfAdmin} from '../../dataAccess/adminReport';

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'flex',
    marginTop: 100,
    alignItems: 'center',
  },
  table: {
    marginTop: 50,
  },
}));

export default function AdminReport2() {
  const classes = useStyles();
  const [reportingData, setReportingData] = useState([]);

  useEffect(() => {
    getSecondReportOfAdmin().then(({success, data, error}) => {
      if (success) {
        setReportingData(data.entries);
      } else {
        alert('Something went wrong', error);
      }
    });
  }, []);

  return (
    <>
      <Grid className={classes.grid} container justifyContent="center">
        <Typography variant="h5">
          Avg. calories of user in past 7 days
        </Typography>
      </Grid>

      <Grid className={classes.table} container justifyContent="center">
        <Grid item>
          <TableContainer component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight: 'bold'}}>User Id</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>
                  Avg. calories in last 7 days
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{alignContent: 'center'}}>
              {reportingData &&
                reportingData.map(row => (
                  <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{parseInt(row.average)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
