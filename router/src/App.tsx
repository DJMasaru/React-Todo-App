import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="posts" element={<Posts />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
