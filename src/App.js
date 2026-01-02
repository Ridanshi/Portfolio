import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioHome from './components/PortfolioHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PortfolioHome />} />
      </Routes>
    </Router>
  );
}

export default App;
