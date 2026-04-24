import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import NotFoundPage from './pages/NotFoundPage';
import { guides } from './guides/registry';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {guides.map((g) => (
        <Route key={g.slug} path={`/games/${g.slug}`} element={<GuidePage guide={g} />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
