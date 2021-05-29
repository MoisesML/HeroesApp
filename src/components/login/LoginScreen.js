import React from 'react'

export default function LoginScreen({ history }) {

  const handleLogin = () => {
    history.replace('/')
  }

  return (
    <div className='container my-5' >
      <h1>Login</h1>
      <hr />

      <button
        className='btn btn-primary'
        onClick={ handleLogin }
      >
        Login
      </button>
    </div>
  )
}
