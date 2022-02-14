import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className="">
        <h1 className="">Supabase + Next.js</h1>
        <p className="">Sign in via magic link with your email below</p>
        <div>
          <input
            className="input"
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="btn btn-primary"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Skicka magisk länk'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
