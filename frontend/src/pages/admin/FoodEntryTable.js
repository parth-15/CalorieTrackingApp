import {useState} from 'react';
import EditFoodEntryModal from './EditFoodEntryModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {deleteFoodEntry, updateFoodEntry} from '../../dataAccess/foodEntry';
import CustomAlert from '../../components/common/Alert';

const getFormattedTime = time => {
  const hours = parseInt(time / 60);
  const minutes = time % 60;
  return hours + ':' + minutes;
};

export default function FoodEntryTable({
  foodEntries,
  count,
  fetchFoodEntries,
  page,
  setPage,
  handleOpenAlert,
}) {
  const [editTarget, setEditTarget] = useState({
    name: '',
    date: '',
    time: '',
    calories: '',
    user: '',
    meal: '',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleEdit = foodEntry => {
    setEditTarget(foodEntry);
    setEditModalOpen(true);
  };

  const handleEditModal = foodEntryInput => {
    // console.log(foodEntryInput);
    // console.log('edit target is', editTarget);
    updateFoodEntry(editTarget.id, foodEntryInput).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'Food entry updated successfully');
        setEditModalOpen(false);
        fetchFoodEntries(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  const handleDeleteConfirm = () => {
    deleteFoodEntry(deleteTargetId).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'Food entry deleted successfully');
        setDeleteModalOpen(false);
        fetchFoodEntries(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  const handleDelete = id => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };
  const handlePagination = (event, page) => {
    setPage(page);
    fetchFoodEntries();
  };

  return (
    <>
      <EditFoodEntryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        foodEntry={editTarget}
        onEdit={handleEditModal}
      />

      <ConfirmModal
        title="Delete Food Entry"
        text="Are you sure you want to delete this food entry?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Meal</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodEntries.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{`${row.date} ${getFormattedTime(
                  row.time,
                )}`}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.user.id}</TableCell>
                <TableCell>{row.meal.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              count={count}
              page={page}
              onChangePage={handlePagination}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
