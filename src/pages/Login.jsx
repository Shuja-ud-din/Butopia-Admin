import React from 'react'
import RegistrationMain from '../components/Registration/RegistrationMain'
import LoginForm from '../components/Registration/LoginForm'

function Login() {
  return (
    <div className="flex justify-between lg:flex-col">
        
    <RegistrationMain/>
    <LoginForm/>
    
    </div>
  )
}

export default Login