/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CustomPageHeader } from '../../components/custom/CustomPageHeader';
import { Container } from 'react-bootstrap';
import { RESULT_INIT_DATA, SCORES } from './partials/constants';
import { FaList } from 'react-icons/fa';
import { TOAST_TYPES } from '../../utils/constants';
import { CustomToast } from '../../components/custom/CustomToast';
import { ResultForm } from '../../components/result/ResultForm';
import ResultDataService from '../../services/ResultDataService';

const AddResults = () => {
  const [result, setResult] = useState(RESULT_INIT_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(TOAST_TYPES.SUCCESS);
  const [toastMessage, setToastMessage] = useState();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [scores, setScores] = useState([]);

  const fetchStudents = useCallback(() => {
    ResultDataService.getAllStudentOptions()
      .then((res) => {
        if (res.data.success) {
          setStudents(prepareStudentOptions(res.data.data));
        } else {
          setStudents([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchCourses = useCallback(() => {
    ResultDataService.getAllCourseOptions()
      .then((res) => {
        if (res.data.success) {
          setCourses(prepareCourseOptions(res.data.data));
        } else {
          setCourses([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    setScores(prepareScoreOptions());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      setResult({
        ...result,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    ResultDataService.create(result)
      .then((res) => {
        if (res.data.success) {
          handleSuccessMessage('Result created successfully!');
        } else {
          handleErrorMessage(res.data.message ?? 'Error creating result!');
        }
      })
      .catch((err) => {
        handleErrorMessage(
          err.response?.data?.message ?? 'Error creating result!'
        );
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setResult(RESULT_INIT_DATA);
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

  const prepareStudentOptions = (studentsData) => {
    if (studentsData && studentsData instanceof Array) {
      return studentsData.map((student) => {
        return {
          value: student.id,
          text: student.name,
        };
      });
    }
  };

  const prepareCourseOptions = (coursesData) => {
    if (coursesData && coursesData instanceof Array) {
      return coursesData.map((course) => {
        return {
          value: course.id,
          text: course.courseName,
        };
      });
    }
  };

  const prepareScoreOptions = () => {
    return Object.keys(SCORES).map((score) => {
      return {
        value: score,
        text: score,
      };
    });
  };

  return (
    <>
      <Container fluid className="mt-3">
        <CustomPageHeader
          headerText="Add New Result"
          hasButton={true}
          buttonText={'List'}
          buttonIcon={<FaList className="btn-icon" />}
          redirectURL={'/results'}
        />

        <ResultForm
          result={result}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          students={students}
          courses={courses}
          scores={scores}
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

export default AddResults;
