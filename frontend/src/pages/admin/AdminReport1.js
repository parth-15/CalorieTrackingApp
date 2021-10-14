import {
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
import {getFirstReportOfAdmin} from '../../dataAccess/adminReport';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(12),
    width: 400,
    margin: 'auto',
  },
}));

export default function AdminReport1() {
  const classes = useStyles();

  const [reportingData, setReportingData] = useState(null);

  useEffect(() => {
    getFirstReportOfAdmin().then(({success, data, error}) => {
      if (success) {
        setReportingData(data);
      } else {
        console.error(error);
      }
    });
  }, []);

  return (
    <>
      <div>
        <TableContainer className={classes.table} component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>
                Foodentries Added in Past week
              </TableCell>
              <TableCell style={{fontWeight: 'bold'}}>
                Foodentries Added in Past to Past week
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{alignContent: 'center'}}>
            <TableRow>
              <TableCell>
                {reportingData && reportingData.pastWeekCount}
              </TableCell>
              <TableCell>
                {reportingData && reportingData.past2WeekCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </div>
    </>
  );
}
