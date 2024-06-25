import { Routes, Route } from 'react-router-dom'

import Main from './components/Main'
import MainActive from './components/Pages/MainActive'
import MainCompleted from './components/Pages/MainCompleted'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/Active" element={<MainActive />} />
    <Route path="/Completed" element={<MainCompleted />} />
  </Routes>
)

export default Rotas
