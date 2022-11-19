import { dbService, storageService } from 'fbase'
import { addDoc, collection, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useState } from 'react'
import { uuidv4 } from '@firebase/util';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';


const SwitFactory = ({ userObj }) => {
  const [swit, setSwit] = useState('')
  const [attachment, setAttachment] = useState('')


  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';

    if (attachment !== '') {
      // 사진 먼저 업로드 하여 url을 얻은 후 submit 해주기
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`) //파일에 대한 참조
      const response = await uploadString(attachmentRef, attachment, 'data_url')
      attachmentUrl = await getDownloadURL(response.ref)
    }

    const switObj = {
      text: swit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }

    const docRef = await addDoc(collection(dbService, 'swits'), switObj)
    setSwit('');
    setAttachment('');
  }

  const onChange = (event) => {
    const { target: { value } } = event;
    setSwit(value)
  }

  const onFileChange = (event) => {
    const { target: { files } } = event
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = () => {
    setAttachment(null)
  }


  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        value={swit}
        maxLength={120}
        onChange={onChange}
      />
      <input type="file" accept='image/*' onChange={onFileChange} />
      <input type="submit" value="Swit" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  )
}

export default SwitFactory