import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JournalList from './JournalList';
import LoginForm from './LoginForm';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/journals" element={<JournalList />} />
          </Routes>
      </Router>
  );
}

export default App;
