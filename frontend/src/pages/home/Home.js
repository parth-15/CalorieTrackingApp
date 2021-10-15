import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {useEffect, useState} from 'react';
import FoodEntryCard from '../../components/home/FoodEntryCard';
import {getAllFoodEntryOfUser} from '../../dataAccess/foodEntry';
import {useAuthenticatedUser} from '../../providers/AuthProvider';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paginationContainer: {display: 'flex', justifyContent: 'center'},
  title: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(12),
  },
  button: {
    marginRight: 15,
  },
}));

export default function Home() {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const [foodEntries, setFoodEntries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllFoodEntryOfUser(user.id, currentPage - 1).then(({data}) => {
      setFoodEntries(data.rows);
      setTotalPages(Math.ceil(data.count / data.perPage));
    });
  }, [currentPage]);

  const handlePagination = (event, count) => {
    setCurrentPage(count);
  };
  return (
    <div>
      <Container>
        <Box my={5} className={classes.title}>
          <Typography component="h2" variant="h4" style={{flexGrow: 1}}>
            Foodentries
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/create"
          >
            Foodentry
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            component={Link}
            to="/meals"
          >
            Meals
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            component={Link}
            to="/userreport"
          >
            Report
          </Button>
          {/* Add three buttons here for user reporting */}
        </Box>
        {foodEntries.map(foodEntry => (
          <Box my={2} key={foodEntry.id}>
            <FoodEntryCard {...foodEntry} />
          </Box>
        ))}
        {!foodEntries.length && (
          <Box my={30}>
            <Typography align="center" color="textSecondary" variant="h6">
              No Foodentry found
            </Typography>
          </Box>
        )}
      </Container>

      <Box className={classes.paginationContainer} my={5}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePagination}
          page={currentPage}
        />
      </Box>
    </div>
  );
}
