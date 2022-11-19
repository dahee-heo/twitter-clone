import { dbService, storageService } from 'fbase';
import { addDoc, collection, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import SwitList from 'components/SwitList';
import SwitFactory from 'components/SwitFactory';

const Home = ({ userObj }) => {
  const [swits, setSwits] = useState([])

  // const getSwits = async () => {
  //   const q = query(collection(dbService, 'swits'));
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach(document => {
  //     const switObj = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     setSwits((prev) => [switObj, ...prev])
  //   })
  // }

  useEffect(() => {
    // getSwits()
    const q = query(collection(dbService, 'swits'));
    onSnapshot(q, (snapshot) => {
      // const switArray = []
      // querySnapshot.forEach(doc => {
      //   switArray.push(doc.data())
      // })
      const switArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setSwits(switArray)
    })

  }, [])


  return (
    <div>
      <SwitFactory userObj={userObj} />
      <div>
        {swits.map(swit => {
          return (
            <SwitList
              key={swit.id}
              switObj={swit}
              isOwner={swit.creatorId === userObj.uid}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home