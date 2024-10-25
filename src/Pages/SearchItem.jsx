import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowSearchesItem from "../Component/ShowSearchesItem";

export default function ShowItem() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [showloading, setshowloading] = useState(false);
    const [Item, setItem] = useState([]);
    const [showMore, setshowMore] = useState(true);
    const [sideBarData, setsideBarData] = useState({
        searchTerm: '',
        mobile: false,
        computer: false,
        CPU: false,
        All: true
    });

    async function showMoreButton() {
        const numberOfItem = Item.length;
        const startIndex = numberOfItem;
        const UrlParams = new URLSearchParams(location.search);
        UrlParams.set('startIndex', startIndex);
        const searchQuery = UrlParams.toString();
        setshowloading(true)
        const res = await fetch(`https://e-backend-two.vercel.app/api/item/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setshowMore(false)
        }
        else {
            setshowMore(true)
        }
        setItem([...Item, ...data]);
        setshowloading(false)
    };

    function HandleChange(e) {
        e.preventDefault();
        if (e.target.id === 'All' || e.target.id === 'mobile' || e.target.id === 'CPU' || e.target.id === 'computer') {
            setsideBarData({ ...sideBarData, [e.target.id]: e.target.checked || e.target.checked === true ? true : false })
        }
        if (e.target.id === 'search2') {
            setsideBarData({ ...sideBarData, searchTerm: e.target.value });
        }
    }

    function HandleSubmit(e) {
        e.preventDefault()
        setloading(true);
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('mobile', sideBarData.mobile)
        urlParams.set('computer', sideBarData.computer)
        urlParams.set('CPU', sideBarData.CPU);
        urlParams.set('All', sideBarData.All);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        setloading(false);
    }
    useEffect(() => {
        const newurl = new URLSearchParams(location.search);
        const searchTermUrl = newurl.get('searchTerm');
        const mobileUrl = newurl.get('moile');
        const computerUrl = newurl.get('computer');
        const AllUrl = newurl.get('All');
        const CPUUrl = newurl.get('CPU');

        if (searchTermUrl || CPUUrl || mobileUrl || AllUrl || computerUrl) {
            setsideBarData({
                searchTerm: searchTermUrl || '',

                CPU: CPUUrl === 'true' ? true : false,

                mobile: mobileUrl === 'true' ? true : false,

                All: AllUrl === 'true' ? true : false,

                computer: computerUrl === 'true' ? true : false
            })
        }
        async function fetchdata() {
            setloading(true)
            try {
                const searchQuery = newurl.toString();
                const res = await fetch(`https://e-backend-two.vercel.app/api/item/get?${searchQuery}`);
                const data = await res.json();
                setItem(data);
                setloading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [location.search])
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex">
                {/* Left div (fixed position for the form) */}
                <div className="p-7 border-b-2 border-gray-500 md:border-r-2 md:min-h-screen fixed top-0 left-0 md:w-1/3 h-screen">
                    <form onSubmit={HandleSubmit} className="flex flex-col gap-8">
                        <div className="flex items-center gap-2">
                            <label className="whiteSpace-nowrap font-semibold">SearchTerm</label>
                            <input
                                type="text"
                                id="search2"
                                name="search2"
                                style={{ borderRadius: '10px' }}
                                value={sideBarData.searchTerm}
                                onChange={HandleChange}
                                placeholder="Search..."
                                className="border rounded-lg p-3 w-full"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap items-center">
                            <label className="font-semibold">Types:</label>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    value={sideBarData.All}
                                    onChange={HandleChange}
                                    checked={sideBarData.All}
                                    id="All"
                                    className="w-5"
                                />
                                <span>All</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    value={sideBarData.mobile}
                                    onChange={HandleChange}
                                    id="mobile"
                                    checked={sideBarData.mobile}
                                    className="w-5"
                                />
                                <span>Mobiles</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    onChange={HandleChange}
                                    checked={sideBarData.computer}
                                    id="computer"
                                    className="w-5"
                                    value={sideBarData.computer}
                                />
                                <span>Computer</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    onChange={HandleChange}
                                    value={sideBarData.CPU}
                                    type="checkbox"
                                    checked={sideBarData.CPU}
                                    id="CPU"
                                    className="w-5"
                                />
                                <span>CPU</span>
                            </div>
                        </div>
                        <button
                            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
                            style={{ borderRadius: '10px' }}
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Right div (scrollable content) */}
                <div className="flex-1 md:w-2/3 ml-auto overflow-y-auto h-screen">
                    <div className="text text-3xl font-semibold border-b p-3 text-slate-700">
                        <h1>Items Results:</h1>
                        <div className="flex flex-wrap p-7 gap-4">
                            {!loading && Item.length === 0 && (
                                <p className="text-xl text-slate-700">No item found!</p>
                            )}
                            {loading && (
                                <p className="text-xl text-slate-700">Loading...</p>
                            )}
                            {!loading && Item && Item.map((item) => (
                                <ShowSearchesItem key={item._id} items={item} />
                            ))}
                            {!loading && (
                                <button
                                    className="text-green-700 hover:underline p-7 text-center w-full text-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        showMoreButton();
                                        setshowloading(true);
                                    }}
                                >
                                    Show more
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
