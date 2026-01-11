import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import { Layout } from './components/layout/Layout';

function App() {
  return (

    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-analyzer" element={<Analyzer />} />
      </Routes>
    </Layout>

  );
}

export default App;
