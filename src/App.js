import PostTypeSelector from './sections/PostTypeSelector';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionPage from './sections/QuestionPage';
import Navbar from './sections/Navbar';
import Login from './sections/logSignUp/Login';
import Signup from './sections/logSignUp/Signup';
import ArticlePage from './sections/ArticlePage';
import HomePage from './sections/HomePage';
import Footer from './sections/Footer';
import StripePage from './sections/StripePage';

function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/postTypeSelector" element={<PostTypeSelector />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/plans" element={<StripePage />} />
            <Route path="/article" element={<ArticlePage />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
