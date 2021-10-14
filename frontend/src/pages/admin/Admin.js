import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {createFoodEntry, getAllFoodEntries} from '../../dataAccess/foodEntry';
import AddIcon from '@material-ui/icons/Add';
import CreateFoodEntryModal from '../../components/home/CreateFoodEntryModal';
import Pagination from '@material-ui/lab/Pagination';
import FoodEntryTable from './FoodEntryTable';
import {Link} from 'react-router-dom';
import CustomAlert from '../../components/common/Alert';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles(theme => ({
  paginationContainer: {display: 'flex', justifyContent: 'center'},
  title: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(12),
  },
  heading: {
    flexGrow: 1,
  },
  button: {
    marginRight: 15,
  },
}));
export default function Admin() {
  const classes = useStyles();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [foodEntries, setFoodEntries] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchFoodEntries = page => {
    getAllFoodEntries(page).then(({data, success, error}) => {
      if (success) {
        setFoodEntries(data.rows);
        setCount(data.count);
      } else {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    fetchFoodEntries(page);
  }, [page]);

  const toggleCreateModalOpen = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCreateModal = foodEntryInput => {
    createFoodEntry(foodEntryInput).then(({success, error}) => {
      if (success) {
        handleOpenAlert('success', 'FoodEntry created successfully');
        setCreateModalOpen(false);
        fetchFoodEntries(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  return (
    <div>
      <Container>
        <Box my={5} className={classes.title}>
          <Typography className={classes.heading} variant="h5">
            Manage Food Entries
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AssessmentIcon />}
            component={Link}
            to="/adminreport"
          >
            Reporting
          </Button>
        </Box>

        <FoodEntryTable
          foodEntries={foodEntries}
          count={count}
          fetchFoodEntries={fetchFoodEntries}
          page={page}
          setPage={setPage}
          handleOpenAlert={handleOpenAlert}
        />
      </Container>

      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </div>
  );
}
