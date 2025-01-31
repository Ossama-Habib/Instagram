import './home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import { useSelector, useDispatch } from 'react-redux'
import HomeSwitch from '../../components/homeSwitch/HomeSwitch'
import Search from '../../components/search/Search'
import insta from '../../assets/insta-front-page.jpeg'
import { useState } from 'react'
import { searchUser } from '../../features/UserInfoSlice'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector(store => store.userInfo)
  const { isUserLoggedIn } = useSelector(store => store.auth)
  const [search, setSearch] = useState('')

  return (
    <>
      {!isUserLoggedIn ?
        <HomeSwitch />
        :
        <section className='home'>
          <div className="home__header">
            <div className="home__header_wrapper">
              <h1>Instagram</h1>
              <div className="home__header_inp">
                <input type="text" placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value); dispatch(searchUser(e.target.value)) }} />

                <div className="home__header_user" style={{ display: search ? "block" : "none" }}>
                  {isLoading && <p>Loading...</p>}
                  {users.map((user) => {
                    const { userName, profileImg } = user

                    return (
                      <div className="users" key={user._id} onClick={() => { navigate(`/${user._id}`); setSearchComponent(false) }}>
                        <img src={profileImg} alt="" />
                        <p>{userName}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>

          <div className="home__bottom">
            <Sidebar />
            <Feed />
          </div>

        </section>
      }
    </>

  )
}

export default Home