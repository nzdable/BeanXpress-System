import { useState } from 'react';
import CustomerSignUp from './CustomerSignUp';
import CustomerLogIn from './CustomerLogIn';
import CustomerHome from './CustomerHome';  // Import CustomerHome
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customerSignUp" element={<CustomerSignUp />} />
        <Route path="/customerLogIn" element={<CustomerLogIn />} />
        <Route path="/customerHome" element={<CustomerHome />} /> 
        
        <Route path="/" element={<Navigate to="/customerSignUp" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
