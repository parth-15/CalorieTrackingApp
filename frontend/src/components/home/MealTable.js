import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {useState} from 'react';
import EditMealModal from './EditMealModal';
import EditIcon from '@material-ui/icons/Edit';
import {updateMeal} from '../../dataAccess/meal';

export default function MealTable({meals, handleOpenAlert, fetchMeals}) {
  const [editTarget, setEditTarget] = useState({
    type: '',
    maxAllowed: 5,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = meal => {
    setEditTarget(meal);
    setEditModalOpen(true);
  };

  const handleEditModal = mealInput => {
    updateMeal(mealInput.id, mealInput).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'Meal updated successfully');
        setEditModalOpen(false);
        fetchMeals();
      } else {
        handleOpenAlert('error', error);
      }
    });
  };
  return (
    <>
      <EditMealModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        meal={editTarget}
        onEdit={handleEditModal}
      />

      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>Id</TableCell>
            <TableCell style={{fontWeight: 'bold'}}>Type</TableCell>
            <TableCell style={{fontWeight: 'bold'}}>
              Max. Items Allowed
            </TableCell>
            <TableCell style={{fontWeight: 'bold'}}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody style={{alignContent: 'center'}}>
          {meals &&
            meals.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.maxAllowed}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row)} color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </TableContainer>
    </>
  );
}
