// import { getAuth, signOut } from 'firebase/auth'
// import { useAuthState } from './firebase'

import { useAuthState, auth } from "../configs/firebase"

export const Home = () => {
  const { user } = useAuthState()
  const d = auth

  return (
    <>
      <h1>Welcome {user?.email}</h1>
      <button onClick={() =>  auth().signOut()}>Sign out</button>
    </>
  )
}