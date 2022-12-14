import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import reportWebVitals from './reportWebVitals';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Events from './components/pages/Events';
import Education from './components/pages/Education';
import Community from './components/pages/Community';
import Blog from './components/pages/Blog';
import BlogDetail from './components/pages/BlogDetail';
import Category from './components/Category';
import Profile from './components/pages/Profile';
import { AuthProvider } from './hocs/Auth';
import PrivateRoutes from './hocs/PrivateRoutes';
import Login from './components/pages/Login';
import Register from './components/pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="blog" element={<Blog />} />
      <Route path="category/:id" element={<Category/>}/>
      <Route path='blog/:id' element={<BlogDetail/>}/>
      <Route path="events" element={<Events />} />
      <Route element={<PrivateRoutes />}>
        <Route path="profile" element={<Profile/>} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="community" element={<Community />} />
      
    </Route>
  </Routes>
</BrowserRouter>
</AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
