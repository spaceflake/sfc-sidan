import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import Account from '../components/Account'
import Head from 'next/head'
import carPic from '../public/testbilbild.png'
import Hero from '../components/Hero'
import Profile from './profile.page'

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
      <div className="flex flex-col grow bg-base-100">
        {!session ? (
          <div className="grow">
            <Hero />
            <div className="card w-full max-w-xl bg-base-100 shadow-xl m-auto mt-28">
              <figure>
                <Image src={carPic} alt="cars racing" />
              </figure>
              <div className="card-body text-neutral-content">
                <h2 className="card-title">Måndagsligan</h2>
                <p>Ännu trevligare racing</p>
                <Link href="/mandagsligan" passHref>
                  <div className="card-actions justify-start">
                    <button className="btn btn-link">läs mer...</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Profile session={session} />
        )}
      </div>
    </>
  )
}
