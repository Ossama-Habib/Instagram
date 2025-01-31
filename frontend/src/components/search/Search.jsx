import React, { useState, useEffect } from 'react'
import './search.css'
import insta from '../../assets/insta-front-page.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../features/UserInfoSlice'
import { useNavigate } from 'react-router-dom'

const Search = ({searchComponent, setSearchComponent}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {users, isLoading,} = useSelector(store => store.userInfo)
    const [query, setQuery] = useState('');

    const findUser = (e) => {
        const searchValue = e.target.value;
        setQuery(searchValue);
        dispatch(searchUser(searchValue));
    }

    useEffect(() => {
        
        return () => {
          setQuery('');
          dispatch(searchUser('')); 
        };
      }, [dispatch]);


  return (
    <>
    
    { searchComponent &&

    <section className='search'>
        <div className="search__wrapper">
            <h1>Search</h1>
            {/* Form */}
            <input type="text" placeholder='search'  onChange={findUser } />

            {/* Users */}
            <div className="searhUsers">
            {isLoading && <p>Loading...</p>}
                {users.map((user) => {
                    const {userName, profileImg} = user

                    return(
                        <div className="users" key={user._id} onClick={() => {navigate(`/${user._id}`); setSearchComponent(false)}}>
                            <img src={profileImg} alt="" />
                            <p>{userName}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
    }
    </>
  )
}

export default Search