import './sidebar.css'
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import { GoVideo } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { openPostModal } from '../../features/PostSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import Search from '../search/Search';
import { useContext, useState } from 'react';
import { ModelContext } from '../../context/modelContext';

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedInUserId } = useSelector(store => store.auth)
    const [searchComponent, setSearchComponent] = useState(false)
    const {isMoreOptionOpen, setIsMoreOptionOpen} = useContext(ModelContext)

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn")
        window.location.reload()
    }
    return (
        <div className='sidebar'>
            <div className="sidebar__wrapper">

                <h1>Instagram</h1>
                <ul className='sidebar__links'>

                    <li className='sidebar__single_link ' onClick={() => navigate('/')}>
                        <IoHomeOutline className='sidebar__link_icon' />
                        <p className='sidebar__link_info'>Home</p>

                    </li>

                    <li className='sidebar__single_link search__link' onClick={() => setSearchComponent(!searchComponent)}>
                        <CiSearch className='sidebar__link_icon' />
                        <p className='sidebar__link_info'>Search</p>
                    </li>
                        <Search searchComponent={searchComponent} setSearchComponent= {setSearchComponent} />

                    <li className='sidebar__single_link '>
                        <MdOutlineExplore className='sidebar__link_icon' />
                        <p className='sidebar__link_info'>Explore</p>

                    </li>

                    <li className='sidebar__single_link ' onClick={() => navigate('/message')}>
                        <LuMessageCircleMore className='sidebar__link_icon' />
                        <p className='sidebar__link_info'>Messages</p>

                    </li>
                    <li className='sidebar__single_link '>
                        <GoVideo className='sidebar__link_icon' />
                        <p className='sidebar__link_info'>Reels</p>

                    </li>
                    <li className='sidebar__single_link '>
                        <FaRegHeart className='sidebar__link_icon' />
                        <p className='sidebar__link_info'>Notification</p>

                    </li>

                    <button className='sidebar__single_link' onClick={() => dispatch(openPostModal())}>
                        <li >
                            <IoIosAddCircleOutline className='sidebar__link_icon' />
                            <p className='sidebar__link_info'>Create</p>

                        </li>
                    </button>
                    <button className='sidebar__single_link' onClick={() => navigate(`/${loggedInUserId}`)}>
                        <li >
                            <ImProfile className='sidebar__link_icon' />
                            <p className='sidebar__link_info'>Profile</p>

                        </li>
                    </button>


                    <li className='sidebar__single_link more' onClick={() => setIsMoreOptionOpen(!isMoreOptionOpen)}>
                        <CgDetailsMore className='sidebar__link_icon' />
                        <p className='sidebar__link_info' >More</p>
                        {isMoreOptionOpen && <div className="logout">
                            <button className='logoutBtn' onClick={handleLogout}>Logout</button>
                        </div>}
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Sidebar