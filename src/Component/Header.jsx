import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaOpencart, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SiStmicroelectronics } from "react-icons/si";

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
        <header className="bg-gray-300 shadow-lg">
            <div className="flex items-center max-w-6xl mx-auto p-3 justify-between">
                <Link to={'/'} className="font-semibold flex flex-col items-center">
                    <SiStmicroelectronics className="" />
                    <span className="text-xs sm:text-base">ElectronicsOnly</span>
                </Link>

                {/* Centered search bar */}
                <div className="flex-1 flex justify-center">
                    <form className="bg-slate-100 p-3 rounded-lg shadow-md flex items-center" onSubmit={HandleSubmit}>
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
                        <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                    </Link>
                    <Link to={'/cart'}>
                        <button>
                            <FaOpencart className="text-slate-600 w-6 h-6 hover:text-slate-800" />
                        </button>
                    </Link>
                    <Link to={'/profile'}>
                        {currentUser ? (
                            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile" />
                        ) :
                            (<li className="text-slate-700 hover:underline sm:inline text-sm">Sign-in</li>)
                        }
                    </Link>
                </ul>

                <button onClick={toggleMenu} className="text-slate-700 focus:outline-none ml-2 sm:hidden">
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            <ul className={`flex flex-col bg-gray-50 border-t border-gray-200 ${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <Link to={'/'} onClick={() => setIsOpen(false)} className={`p-3 text-slate-700 hover:underline ${location.pathname === '/' ? 'font-semibold text-yellow-500' : ''}`}>
                    <li>Home</li>
                </Link>
                <Link to={'/cart'}>
                    <button>
                        <FaOpencart className="text-slate-600 w-6 h-6 hover:text-slate-800" />
                    </button>
                </Link>
                <Link to={'/profile'}>
                    {currentUser ? (
                        <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile" />
                    ) :
                        (<li className="text-slate-700 hover:underline sm:inline text-sm">Sign-in</li>)
                    }
                </Link>
            </ul>
        </header>
    );
}
