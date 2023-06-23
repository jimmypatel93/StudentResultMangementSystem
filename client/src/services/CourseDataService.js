import http from '../utils/http-common';

const create = (data) => {
  return http.post('/course', data);
};

const remove = (id) => {
  return http.delete(`/course/${id}`);
};

const getAll = () => {
  return http.get('/course/list');
};

const CourseDataService = {
  create,
  remove,
  getAll,
};

export default CourseDataService;
