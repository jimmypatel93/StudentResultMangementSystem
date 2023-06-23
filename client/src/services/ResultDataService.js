import http from '../utils/http-common';

const create = (data) => {
  return http.post('/result', data);
};

const getAll = () => {
  return http.get('/result/list');
};

const getAllStudentOptions = () => {
  return http.get('/result/allStudents');
};

const getAllCourseOptions = () => {
  return http.get('/result/allCourses');
};

const ResultDataService = {
  create,
  getAll,
  getAllStudentOptions,
  getAllCourseOptions,
};

export default ResultDataService;
