/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { CustomPageHeader } from '../../components/custom/CustomPageHeader';
import { CustomTable } from '../../components/custom/CustomTable';
import { CustomToast } from '../../components/custom/CustomToast';
import { TOAST_TYPES } from '../../utils/constants';
import { COURSE_COLUMNS } from './partials/constants';
import { CustomDialog } from '../../components/custom/CustomDialog';
import CourseDataService from '../../services/CourseDataService';
import { FaPlus } from 'react-icons/fa';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(TOAST_TYPES.SUCCESS);
  const [toastMessage, setToastMessage] = useState();
  const [courseIdToDelete, setCourseIdToDelete] = useState();

  const fetchCourses = useCallback(async () => {
    CourseDataService.getAll()
      .then((res) => {
        if (res && res.data.success) {
          setCourses(res.data.data);
        } else {
          handleErrorMessage('Error fetching courses list!');
        }
      })
      .catch((err) => {
        handleErrorMessage('Error fetching courses list!');
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(async (courseId) => {
    setCourseIdToDelete(courseId);
    setShowDialog(true);
  }, []);

  const handleConfirmDelete = () => {
    CourseDataService.remove(courseIdToDelete)
      .then((res) => {
        if (res && res.data.success) {
          setCourses(
            courses.filter((course) => course.id !== courseIdToDelete)
          );
          handleSuccessMessage('Course deleted successfully!');
        } else {
          handleErrorMessage('Error deleting course!');
        }
      })
      .catch((err) => {
        handleErrorMessage('Error deleting course!');
        console.log(err);
      })
      .finally(() => {
        setShowDialog(false);
        setCourseIdToDelete();
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSuccessMessage = (message) => {
    setToastType(TOAST_TYPES.SUCCESS);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleErrorMessage = (message) => {
    setToastType(TOAST_TYPES.ERROR);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <Container fluid className="mt-3">
      <CustomPageHeader
        headerText="Courses List"
        hasButton={true}
        buttonText={'Add'}
        buttonIcon={<FaPlus className="btn-icon" />}
        redirectURL={'/add-courses'}
      />
      <CustomTable
        columns={COURSE_COLUMNS}
        data={courses}
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
        dialogHeaderText={'Delete Course'}
        dialogConfirmText={'Are you sure you want to delete this course?'}
        dialogConfirmBtnText={'Confirm'}
        dialogCancelBtnText={'Cancel'}
        handleConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default CoursesList;
