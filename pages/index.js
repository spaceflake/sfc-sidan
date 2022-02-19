import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import CreateLdb from '../components/CreateLdb'
import Head from 'next/head'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      <Head>
        <title>SFC | Start</title>
        <meta
          name="keywords"
          content="racing, community, forza, forza Motorsport 7, svensk racing liga, online racing, discord, facebook"
        ></meta>
        <meta
          name="description"
          content="Sveriges bästa och roligaste online racing liga, SFC - Swedish Forza Championship. Vi kör Forza Motorsport 7."
        ></meta>
      </Head>
      <div className=" bg-base-100">
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
        <CreateLdb />
      </div>
    </>
  )
}
