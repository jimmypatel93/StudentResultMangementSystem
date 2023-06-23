import React, { useState } from 'react';
import { CustomPageHeader } from '../../components/custom/CustomPageHeader';
import { Container } from 'react-bootstrap';
import { STUDENT_INIT_DATA } from './partials/constants';
import { StudentForm } from '../../components/student/StudentForm';
import { FaList } from 'react-icons/fa';
import StudentDataService from '../../services/StudentDataService';
import { TOAST_TYPES } from '../../utils/constants';
import { CustomToast } from '../../components/custom/CustomToast';

const AddStudents = () => {
  const [student, setStudent] = useState(STUDENT_INIT_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(TOAST_TYPES.SUCCESS);
  const [toastMessage, setToastMessage] = useState();
  const [isValidEmail, setValidEmail] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      if (name === 'email') {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailRegex.test(value);
        setValidEmail(isValid);
      }

      setStudent({
        ...student,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      return;
    }

    setIsSubmitting(true);

    StudentDataService.create(student)
      .then((res) => {
        if (res.data.success) {
          handleSuccessMessage('Student created successfully!');
        } else {
          handleErrorMessage(res.data.message ?? 'Error creating student!');
        }
      })
      .catch((err) => {
        handleErrorMessage(
          err.response?.data?.message ?? 'Error creating student!'
        );
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setStudent(STUDENT_INIT_DATA);
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
          headerText="Add New Student"
          hasButton={true}
          buttonText={'List'}
          buttonIcon={<FaList className="btn-icon" />}
          redirectURL={'/students'}
        />

        <StudentForm
          student={student}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isValidEmail={isValidEmail}
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

export default AddStudents;
