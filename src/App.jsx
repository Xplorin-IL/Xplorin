import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Assistant from "./pages/Assistant";
import Review from "./pages/Review";
import About from "./pages/About";
import Login from "./pages/Login";
<<<<<<< HEAD
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';


=======
import DetailRestaurant from './components/DetailRestaurant';
>>>>>>> page/detailRestaurant

function App() {
    return(
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={
                    <>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/assistant" element={<Assistant />} />
                            <Route path="/review" element={<Review />} />
                            <Route path="/about" element={<About />} />
                            <Route path='/profile' element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </>
                } />
=======
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/detail/:restaurantSlug" element={<DetailRestaurant />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/review" element={<Review />} />
                <Route path="/about" element={<About />} />
                <Route path='/login'element={<Login />}/>
>>>>>>> page/detailRestaurant
            </Routes>
        </BrowserRouter>
    );
}

export default App