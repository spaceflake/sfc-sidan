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
    <div className="card bg-base-200 max-w-sm shadow-lg">
      <div className="card-body">
        <h1 className="text-center text-3xl font-bold mb-6 uppercase">
          Logga in
        </h1>
        <p className=" font-light">
          Logga in via en magisk länk. Ange din email nedan.
        </p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input"
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control mt-6">
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
