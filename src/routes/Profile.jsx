import { authService, dbService } from 'fbase'
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const nav = useNavigate()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  const onLogout = () => {
    authService.signOut();
    nav('/', { replace: true })
  };

  const getMySwits = async () => {
    const q = query(collection(dbService, 'swits'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt'))
    const querySnapshot = await getDocs(q)
    console.log('querySnapshot: ', querySnapshot);
    querySnapshot.docs.map(doc => console.log(doc.data()))
  }

  useEffect(() => {
    getMySwits();
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      })
      refreshUser();
      //프로필 수정 후 user정보에서 바꿔주기
    }
  }

  const onChange = (event) => {
    const { target: { value } } = event
    setNewDisplayName(value)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder='Display name'
          value={newDisplayName} />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogout}>Logout</button>
    </>
  )
}

export default Profile