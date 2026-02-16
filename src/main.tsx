import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/MainPage.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { StoriesPage } from './pages/StoriesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<MainPage />} />
      <Route path='stories' element={<StoriesPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
