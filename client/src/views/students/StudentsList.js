/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { CustomPageHeader } from '../../components/custom/CustomPageHeader';
import StudentDataService from '../../services/StudentDataService';
import { CustomTable } from '../../components/custom/CustomTable';
import { CustomToast } from '../../components/custom/CustomToast';
import { TOAST_TYPES } from '../../utils/constants';
import { STUDENT_COLUMNS } from './partials/constants';
import { CustomDialog } from '../../components/custom/CustomDialog';
import { FaPlus } from 'react-icons/fa';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(TOAST_TYPES.SUCCESS);
  const [toastMessage, setToastMessage] = useState();
  const [studentIdToDelete, setStudentIdToDelete] = useState();

  const fetchStudents = useCallback(async () => {
    StudentDataService.getAll()
      .then((res) => {
        if (res && res.data.success) {
          setStudents(processStudentsResponse(res.data.data));
        } else {
          handleErrorMessage('Error fetching students list!');
        }
      })
      .catch((err) => {
        handleErrorMessage('Error fetching students list!');
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(async (studentId) => {
    setStudentIdToDelete(studentId);
    setShowDialog(true);
  }, []);

  const handleConfirmDelete = () => {
    StudentDataService.remove(studentIdToDelete)
      .then((res) => {
        if (res && res.data.success) {
          setStudents(
            students.filter((student) => student.id !== studentIdToDelete)
          );
          handleSuccessMessage('Student deleted successfully!');
        } else {
          handleErrorMessage(res.data.message ?? 'Error deleting student!');
        }
      })
      .catch((err) => {
        handleErrorMessage('Error deleting student!');
        console.log(err);
      })
      .finally(() => {
        setShowDialog(false);
        setStudentIdToDelete();
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const processStudentsResponse = (studentData) => {
    if (studentData) {
      return studentData.map((student) => ({
        ...student,
        fullName: student.firstName + ' ' + student.familyName,
      }));
    }

    return studentData;
  };

  const handleSuccessMessage = (message) => {
    setToastType(TOAST_TYPES.SUCCESS);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    });
  };

  const handleErrorMessage = (message) => {
    setToastType(TOAST_TYPES.ERROR);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    });
  };

  return (
    <Container fluid className="mt-3">
      <CustomPageHeader
        headerText="Students List"
        hasButton={true}
        buttonText={'Add'}
        buttonIcon={<FaPlus className="btn-icon" />}
        redirectURL={'/add-students'}
      />
      <CustomTable
        columns={STUDENT_COLUMNS}
        data={students}
        handleDelete={handleDelete}
      />
      <CustomToast
        showToast={showToast}
        toastMessage={toastMessage}
        toastType={toastType}
      />
      <CustomDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        dialogHeaderText={'Delete Student'}
        dialogConfirmText={'Are you sure you want to delete this student?'}
        dialogConfirmBtnText={'Confirm'}
        dialogCancelBtnText={'Cancel'}
        handleConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default StudentsList;
