import Navbar from '../components/navbar/navbar.jsx'
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from '../components/home.jsx'
import Contact from '../components/contact.jsx'
import About from '../components/about.jsx'
function Layout() {
    return (
        <div>
            <HashRouter>
                <Navbar></Navbar>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={ <Contact />} />
                        <Route path="/about" element={ <About />} />
                    </Routes>

                </div>
            </HashRouter>
        </div>
    )
}

export default Layout;