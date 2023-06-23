import http from '../utils/http-common';

const create = (data) => {
  return http.post('/student', data);
};

const remove = (id) => {
  return http.delete(`/student/${id}`);
};

const getAll = () => {
  return http.get('/student/list');
};

const StudentDataService = {
  create,
  remove,
  getAll,
};

export default StudentDataService;
