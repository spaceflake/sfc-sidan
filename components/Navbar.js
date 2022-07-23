import Image from 'next/image'
import Link from 'next/link'
import Login from './Auth'
import { supabase } from '../utils/supabaseClient'

import { useState, useEffect } from 'react'

const Navbar = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return (
    <nav className="navbar bg-base-300 ">
      <div className="flex justify-between w-full px-10">
        <Link href="/" passHref>
          <Image
            src="/sfclogowh.png"
            alt="SFC Logo"
            width={50}
            height={35}
            className=" cursor-pointer"
          />
        </Link>
        <div className=" space-x-4">
          <Link href="/admin">ADMIN</Link>
          <Link href="/profile">PROFIL</Link>
          {session ? (
            <button
              className="btn btn-primary"
              onClick={() => supabase.auth.signOut()}
            >
              Logga ut
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn m-1">
                Logga In
              </label>
              <div tabIndex="0" className="dropdown-content">
                <Login />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
