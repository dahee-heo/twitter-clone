import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {
          isLoggedIn
            ? (
              <>
                <Route path='/' element={<Home userObj={userObj} />}></Route>
                <Route path='/profile' element={<Profile userObj={userObj} refreshUser={refreshUser} />}></Route>
              </>
            )
            : (
              <>
                <Route path='/' element={<Auth />}></Route>
              </>
            )
        }
      </Routes>
    </>
  )
}

export default AppRouter