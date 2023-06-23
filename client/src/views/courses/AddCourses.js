import React, { useState } from 'react';
import { CustomPageHeader } from '../../components/custom/CustomPageHeader';
import { Container } from 'react-bootstrap';
import { COURSE_INIT_DATA } from './partials/constants';
import { FaList } from 'react-icons/fa';
import { TOAST_TYPES } from '../../utils/constants';
import { CustomToast } from '../../components/custom/CustomToast';
import CourseDataService from '../../services/CourseDataService';
import { CourseForm } from '../../components/course/CourseForm';

const AddCourses = () => {
  const [course, setCourse] = useState(COURSE_INIT_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(TOAST_TYPES.SUCCESS);
  const [toastMessage, setToastMessage] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      setCourse({
        ...course,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    CourseDataService.create(course)
      .then((res) => {
        if (res.data.success) {
          handleSuccessMessage('Course created successfully!');
        } else {
          handleErrorMessage(res.data.message ?? 'Error creating course!');
        }
      })
      .catch((err) => {
        handleErrorMessage(
          err.response?.data?.message ?? 'Error creating course!'
        );
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setCourse(COURSE_INIT_DATA);
      });
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
    <>
      <Container fluid className="mt-3">
        <CustomPageHeader
          headerText="Add New Course"
          hasButton={true}
          buttonText={'List'}
          buttonIcon={<FaList className="btn-icon" />}
          redirectURL={'/courses'}
        />

        <CourseForm
          course={course}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        <CustomToast
          showToast={showToast}
          toastMessage={toastMessage}
          toastType={toastType}
        />
      </Container>
    </>
  );
};

export default AddCourses;
