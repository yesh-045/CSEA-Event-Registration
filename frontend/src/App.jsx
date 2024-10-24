// App.js or App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homrPage'; // Adjust the path based on your file structure
import RegistrationForm from './components/RegistrationForm'; // Assuming you have this component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Homepage */}
                <Route path="/events/CodeRush/register" element={<RegistrationForm />} /> {/* Registration Page */}
                {/* Add other routes here as needed */}
            </Routes>
        </Router>
    );
};

export default App;
