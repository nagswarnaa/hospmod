import { auth } from 'firebase'
import { useCallback } from 'react'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {

    // const a = auth
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    // const auth = getAuth()
    try {
        await auth().signInWithEmailAndPassword(email, password)
    //   await signInWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {
    //   alert(e.message)
    console.log("\n E: ", e);
    }
  }, [])

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </>
  )
}