import AuthForm from 'components/AuthForm'
import { authService } from 'fbase'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'

const Auth = () => {

  const onSocial = async (event) => {
    const { target: { name } } = event;
    let provider
    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(authService, provider)
    console.log('data: ', data);
  }

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocial}>Google Login</button>
        <button name="github" onClick={onSocial}>Github Login</button>
      </div>
    </div>
  )
}

export default Auth