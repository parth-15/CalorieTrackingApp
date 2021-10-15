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
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {Link} from 'react-router-dom';
import CreateFoodEntryModal from '../../components/home/CreateFoodEntryModal';
import {createFoodEntry} from '../../dataAccess/foodEntry';
import CustomAlert from '../../components/common/Alert';

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
  const [createFoodEntryModalOpen, setCreateFoodEntryModalOpen] =
    useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchAllFoodEntryOfUser = currentPage => {
    getAllFoodEntryOfUser(user.id, currentPage - 1).then(({data}) => {
      setFoodEntries(data.rows);
      setTotalPages(Math.ceil(data.count / data.perPage));
    });
  };

  useEffect(() => {
    fetchAllFoodEntryOfUser(currentPage);
  }, [currentPage]);

  const toggleCreateFoodEntryModalOpen = () => {
    setCreateFoodEntryModalOpen(!createFoodEntryModalOpen);
  };

  const handleCreateModal = foodEntryInput => {
    const time =
      parseInt(foodEntryInput.hours) * 60 + parseInt(foodEntryInput.minutes);
    createFoodEntry({...foodEntryInput, time}).then(({success, error}) => {
      if (success) {
        handleOpenAlert('success', 'Foodentry created successfully');
        fetchAllFoodEntryOfUser(currentPage);
        setCreateFoodEntryModalOpen(false);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

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

          <CreateFoodEntryModal
            open={createFoodEntryModalOpen}
            onClose={() => setCreateFoodEntryModalOpen(false)}
            onCreate={handleCreateModal}
          />

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={toggleCreateFoodEntryModalOpen}
          >
            Foodentry
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<LunchDiningIcon />}
            component={Link}
            to="/meals"
          >
            Meals
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AssessmentIcon />}
            component={Link}
            to="/userreport"
          >
            Report
          </Button>
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

      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </div>
  );
}
