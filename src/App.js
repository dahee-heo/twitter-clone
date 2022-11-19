import { useEffect, useState } from "react";
import AppRouter from "components/Router";
// import { app } from "fbase";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //로그인하면 실행되는 로직
        setIsLoggedIn(true)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    // setUserObj(authService.currentUser)
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
    </>
  );
}

export default App;
