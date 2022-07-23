import Account from '../components/Account'
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'

const Profile = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <>
      <Account key={session?.user?.id} session={session} />
    </>
  )
}

export default Profile
