'use client'

import { useUser } from "@/context/user"

const Profile = () => {
  const {user} = useUser()

  return (
    <>
      <h1>Hola: { user?.fullName }</h1>
      <p>Email: { user?.email }</p>
      <p>Verify: { JSON.stringify(user?.verify) }</p>
      <p>Active: { JSON.stringify(user?.isActive) }</p>
      <p>Role: { user?.role }</p>
    </>
  )
}

export default Profile
