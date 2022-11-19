import { dbService, storageService } from 'fbase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React, { useState } from 'react'

const SwitList = ({ switObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newSwit, setNewSwit] = useState(switObj.text);

  const onDelete = async () => {
    const ok = window.confirm("삭제하시겠습니까?")
    if (ok) {
      await deleteDoc(doc(dbService, `swits/${switObj.id}`))
      await deleteObject(ref(storageService, switObj.attachmentUrl))
    }
  }

  const toggleEditing = () => {
    setEditing(prev => !prev)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(switObj, newSwit)
    await updateDoc(doc(dbService, `swits/${switObj.id}`), {
      text: newSwit,
    })
    setEditing(false)
  }

  const onChange = (event) => {
    const { target: { value } } = event
    setNewSwit(value)
  }

  return (
    <div>
      <h4>{switObj.text}</h4>
      {
        editing
          ? (<>
            <form onSubmit={onSubmit}>
              <input type="text" placeholder='Edit your Swit' value={newSwit} required onChange={onChange} />
              <input type="submit" value="Update" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
          ) : (
            <>
              <h4>{switObj.text}</h4>
              {switObj.attachmentUrl && (
                <img src={switObj.attachmentUrl} width="50px" height="50px" />
              )}
              {isOwner && (
                <>
                  <button onClick={onDelete}>Delete Swit</button>
                  <button onClick={toggleEditing}>Edit Swit</button>
                </>
              )}
            </>
          )
      }
    </div>
  )
}
export default SwitList