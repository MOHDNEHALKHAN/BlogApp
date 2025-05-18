import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Editor from './pages/Editor';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/editor/:id?" element={<Editor />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
