/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { CustomPageHeader } from '../../components/custom/CustomPageHeader';
import { CustomTable } from '../../components/custom/CustomTable';
import { CustomToast } from '../../components/custom/CustomToast';
import { TOAST_TYPES } from '../../utils/constants';
import { RESULT_COLUMNS } from './partials/constants';
import ResultDataService from '../../services/ResultDataService';
import { FaPlus } from 'react-icons/fa';

const ResultsList = () => {
  const [results, setResults] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(TOAST_TYPES.SUCCESS);
  const [toastMessage, setToastMessage] = useState();

  const fetchResults = useCallback(async () => {
    ResultDataService.getAll()
      .then((res) => {
        if (res && res.data.success) {
          setResults(res.data.data);
        } else {
          handleErrorMessage('Error fetching results list!');
        }
      })
      .catch((err) => {
        handleErrorMessage('Error fetching results list!');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchResults();
  }, []);

  const handleErrorMessage = (message) => {
    setToastType(TOAST_TYPES.ERROR);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <Container fluid className="mt-3">
      <CustomPageHeader
        headerText="Results List"
        hasButton={true}
        buttonText={'Add'}
        buttonIcon={<FaPlus className="btn-icon" />}
        redirectURL={'/add-results'}
      />
      <CustomTable columns={RESULT_COLUMNS} data={results} />
      <CustomToast
        showToast={showToast}
        toastMessage={toastMessage}
        toastType={toastType}
      />
    </Container>
  );
};

export default ResultsList;
