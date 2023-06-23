import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import { Col, Container, Row } from 'react-bootstrap';
import StudentsList from './views/students/StudentsList';
import AddStudents from './views/students/AddStudents';
import CoursesList from './views/courses/CoursesList';
import AddCourses from './views/courses/AddCourses';
import ResultsList from './views/results/ResultsList';
import AddResults from './views/results/AddResults';

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row className="flex-row">
          <Col lg={3} md={4} className="p-0">
            <Header />
          </Col>
          <Col lg={9} md={8}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/add-students" element={<AddStudents />} />
              <Route path="/students" element={<StudentsList />} />
              <Route path="/add-courses" element={<AddCourses />} />
              <Route path="/courses" element={<CoursesList />} />
              <Route path="/add-results" element={<AddResults />} />
              <Route path="/results" element={<ResultsList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
