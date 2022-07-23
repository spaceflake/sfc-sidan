import { useState, useEffect, useId } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const id = useId()

  // useEffect(() => {
  //   getProfile()
  // }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      // const user = supabase.auth.user();

      // const updates = {
      //   id: user.id,
      //   username,
      //   website,
      //   avatar_url,
      //   updated_at: new Date(),
      // };

      // let { error } = await supabase.from('profiles').upsert(updates, {
      //   returning: 'minimal', // Don't return the value after inserting
      // });
      const { user, error } = await supabase.auth.update({
        email,
        password,
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full grid place-content-center bg-slate-800">
      <div>
        <h1 className=" font-extrabold text-6xl">Din Profil</h1>
        <p className=" text-purple-500">
          Kolla dina stats, ändra dina uppgifter.
        </p>
      </div>

      <div className="form-control space-y-2 mt-10">
        <div>
          <label className=" input-group">
            <span>Email</span>
            <input
              id={id + '-email'}
              className="input input-bordered"
              type="text"
              value={session?.user?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className=" input-group">
            <span>Password</span>
            <input
              id={id + '-password'}
              className=" input input-bordered"
              type="text"
              value={session?.user?.password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className=" input-group">
            <span>Gamertag</span>
            <input
              id={id + '-username'}
              className=" input input-bordered"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className=" input-group">
            <span>Webbsida</span>
            <input
              id={id + '-website'}
              className="input input-bordered"
              type="website"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div>
          <button className="btn" onClick={updateProfile} disabled={loading}>
            {loading ? 'Laddar...' : 'Uppdatera'}
          </button>
        </div>

        <div>
          <button className="btn" onClick={() => supabase.auth.signOut()}>
            Logga ut
          </button>
        </div>
      </div>
    </div>
  )
}
