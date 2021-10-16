import {
  Box,
  Card,
  CardActionArea,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {DateRangeOutlined} from '@material-ui/icons';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 15,
  },
  actionArea: {
    padding: 30,
  },
  typography: {
    marginLeft: 15,
  },
});

const getTimeFormat = unit => {
  let unitInString = unit.toString();
  if (unitInString.length < 2) {
    unitInString = `0${unitInString}`;
  }
  return unitInString;
};

const getFormattedTime = time => {
  const hours = getTimeFormat(parseInt(time / 60));
  const minutes = getTimeFormat(time % 60);
  return hours + ':' + minutes;
};

export default function FoodEntryCard({id, name, date, time, calories, meal}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{border: '1px solid black'}}>
      <CardActionArea className={classes.actionArea}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Box className={classes.date}>
          <DateRangeOutlined color="primary" />
          <Typography color="secondary">{date}</Typography>
          <WatchLaterIcon color="primary" className={classes.typography} />
          <Typography color="primary">{getFormattedTime(time)}</Typography>
        </Box>
        <Typography color="textPrimary">Calories: {calories}</Typography>
        <Box>
          <Typography>Meal: {meal && meal.type}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
