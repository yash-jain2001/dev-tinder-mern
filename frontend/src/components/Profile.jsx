import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector((store)=>store.user)

  return user && (
    <div className='flex items-center justify-center px-80'>
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile