import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Assistant from "./pages/Assistant";
import Review from "./pages/Review";
import About from "./pages/About";
import Login from "./pages/Login";



function App() {
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/review" element={<Review />} />
                <Route path="/about" element={<About />} />
                <Route path='/login'element={<Login />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
