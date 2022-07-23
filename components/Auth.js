import { useState, useId } from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const id = useId()

  const handleLogin = async (email, pwd) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      alert('Inloggad')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card bg-base-200 max-w-md shadow-lg">
      <div className="card-body">
        <h1 className="text-center text-3xl font-bold mb-6 uppercase">
          Logga in
        </h1>
        <p className=" font-light">Ange din email och lösenord.</p>
        <div className="form-control">
          <label htmlFor={id + '-email'} className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id={id + '-email'}
            className="input"
            type="email"
            placeholder="Din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor={id + '-pwd'} className="label">
            <span className="label-text">Lösenord</span>
          </label>
          <input
            id={id + '-pwd'}
            className="input"
            type="password"
            placeholder="Ditt lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <span>{loading ? 'Loading' : 'Logga in'}</span>
          </button>
        </div>
        <p>Inget konto än?</p>
        <Link href="/signup">
          <a className=" text-purple-500">Skapa konto</a>
        </Link>
      </div>
    </div>
  )
}
