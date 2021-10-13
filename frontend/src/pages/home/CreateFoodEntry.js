import {useState} from 'react';
import CustomAlert from '../../components/common/Alert';
import CreateFoodEntryModal from '../../components/home/CreateFoodEntryModal';
import {createFoodEntry} from '../../dataAccess/foodEntry';

export default function CreateFoodEntry() {
  const [createModalOpen, setCreateModalOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const toggleCreateModalOpen = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCreateModal = foodEntryInput => {
    const time =
      parseInt(foodEntryInput.hours) * 60 + parseInt(foodEntryInput.minutes);
    createFoodEntry({...foodEntryInput, time}).then(({success, error}) => {
      if (success) {
        handleOpenAlert('success', 'Foodentry created successfully');
        setCreateModalOpen(false);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  return (
    <div>
      <CreateFoodEntryModal
        open={createModalOpen}
        onClose={toggleCreateModalOpen}
        onCreate={handleCreateModal}
      />
      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </div>
  );
}
