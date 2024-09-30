import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Home from './pages/Home'; 
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBondary';
import Form from './pages/Form';
import Result from './pages/Result';
import Success from './pages/Success';
import EvaluationSelect from './components/EvaluationSelect'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/form" 
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          } 
        />
        <Route path="/selectevaluation" element={<EvaluationSelect />} />
        <Route 
          path="/dashboard" 
          element={
            <ErrorBoundary>
              <Result />
            </ErrorBoundary>
          }
        />
        <Route 
          path="/success" 
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
