import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaOpencart, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SiStmicroelectronics } from "react-icons/si";
import { IoPerson } from "react-icons/io5";
import { IoLogoElectron } from "react-icons/io5";

export default function Header() {

    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { currentUser } = useSelector((state) => state.user1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    function HandleSubmit(e) {
        e.preventDefault();
        const urlSearchParam = new URLSearchParams(window.location.search);
        urlSearchParam.set('searchTerm', searchTerm);
        const searchQuery = urlSearchParam.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchFromUrl = urlParams.get('searchTerm');
        if (searchFromUrl) {
            setSearchTerm(searchFromUrl);
        }
    }, [location.search]);

    return (
        <header className="shadow-lg" style={{ 'backgroundColor': 'rgba(102, 102, 102, 1)' }}>
            <div className="flex items-center max-w-6xl mx-auto p-3 justify-between">
                <Link to={'/'} className="font-semibold flex flex-col items-center">
                    <IoLogoElectron className="text-white" />
                    <span className="text-xs sm:text-base text-white">E-commerce</span>
                </Link>

                {/* Centered search bar */}
                <div className="flex-1 flex justify-center">
                    <form className="bg-slate-100 p-3 rounded-lg shadow-md flex items-center" style={{ 'borderRadius': '10px' }} onSubmit={HandleSubmit}>
                        <input
                            placeholder="Search items..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            type="text"
                            className="bg-transparent focus:outline-none w-24 sm:w-64"
                        />
                        <button className="text-slate-600 text-sm">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                <ul className="hidden sm:flex gap-5 pr-6">
                    <Link to={'/'}>
                        <li className="hidden sm:inline hover:underline text-white">Home</li>
                    </Link>
                    <Link to={'/cart'}>
                        <button>
                            <FaOpencart className="text-white w-6 h-6 hover:text-slate-800" />
                        </button>
                    </Link>
                    <Link to={'/Upload'}>
                        <li className="text-white hover:underline sm:inline ">Upload</li>
                    </Link>
                    <Link to={'/profile'}>
                        {currentUser ? (
                            <img
                                src={currentUser.avatar}
                                alt={<IoPerson />}
                                className="rounded-full h-7 w-7 object-cover"
                            />
                        ) : (
                            <li className="text-slate-700 hover:underline sm:inline ">
                                Sign-in
                            </li>
                        )}
                    </Link>
                </ul>

                <button onClick={toggleMenu} className="text-slate-700 focus:outline-none ml-2 sm:hidden">
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            <ul className={`flex flex-col bg-gray-50 border-t border-gray-200 ${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <Link to={'/'} onClick={() => setIsOpen(false)} className="p-3 text-slate-700 hover:underline">
                    <li>Home</li>
                </Link>
                <Link to={'/cart'} className="p-3">
                    <button className="flex items-center justify-center gap-x-2">
                        <FaOpencart className="text-slate-600 w-4 h-4 hover:text-slate-800" /><span>(Cart)</span>
                    </button>
                </Link>
                <Link to={'/Upload/:id'} className="p-3">
                    <li className="text-slate-700 hover:underline sm:inline text-sm">Upload</li>
                </Link>
                <Link to={'/profile'} className="p-3">
                    {currentUser ? (
                        <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt={<IoPerson />} />
                    ) :
                        (<li className="text-slate-700 hover:underline sm:inline text-sm">Sign-in</li>)
                    }
                </Link>

            </ul>
        </header>
    );
}
