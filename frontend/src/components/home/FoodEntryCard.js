import {
  Box,
  Card,
  CardActionArea,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {DateRangeOutlined} from '@material-ui/icons';
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
});

const getFormattedTime = time => {
  const hours = parseInt(time / 60);
  const minutes = time % 60;
  return hours + ':' + minutes;
};

export default function FoodEntryCard({id, name, date, time, calories, meal}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Box className={classes.date}>
          <DateRangeOutlined color="primary" />
          <Typography color="textSecondary">
            {`${date} ${getFormattedTime(time)}`}
          </Typography>
        </Box>
        <Typography color="textPrimary">CALORIES: {calories}</Typography>
        <Box>
          <Typography>MEAL: {meal && meal.type}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
