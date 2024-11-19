import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';

// Below code will show you how to get dynamic routing, e.g. 1, 2, 3 id's etc. 
function App() {
  return (
    <Router>    
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />}></Route>  
      <Route path=":id" element={<Posts />}></Route>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
