import { Link, useNavigate } from "react-router-dom";
import { FaOpencart, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiStmicroelectronics } from "react-icons/si";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user1)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 

    function HandleSubmit(e) {
        e.preventDefault();
        const urlSearchParam = new URLSearchParams(window.location.search)
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
        <header className="bg-gray-300 shadow-lg" >
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to={'/'} className="font-semibold flex flex-col items-center ">
                   <SiStmicroelectronics className=""/>
                   <span className="text-sm">ElectronicsOnly</span>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg shadow-md items-center" onSubmit={HandleSubmit} >
                    <input placeholder="Search items..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" />
                    <button className="text-slate-600"><FaSearch className="" /></button>
                </form>
                <ul className="flex gap-5">
                    <Link to={'/'}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                    </Link>
                    <Link to={'/cart'}>
                        <button>
                            <FaOpencart className="text-slate-600  w-6 h-6 hover:text-slate-800  " />
                        </button>
                    </Link>
                    <Link to={'/profile'}>
                        {currentUser ? (
                            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile" />
                        ) :
                            (<li className="text-slate-700 hover:underline sm:inline">Sign-in</li>)
                        }
                    </Link>
                </ul>
            </div>
        </header>
    )
}
