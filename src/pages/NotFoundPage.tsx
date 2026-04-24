import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <>
      <main className="grid-container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <h1>404 — Guide not found</h1>
        <p>
          The page you’re looking for doesn’t exist. <Link to="/">Return home</Link>.
        </p>
      </main>
      <Footer />
    </>
  );
}
