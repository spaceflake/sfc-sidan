import { useState, useId } from 'react'
import { supabase } from '../utils/supabaseClient'
import Link from 'next/link'

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const id = useId()

  const handleLogin = async (email, pwd) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      alert('Check your email to confirm!')
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
          Skapa konto
        </h1>
        <p className=" font-light">Fyll i uppgifterna nedan.</p>
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
            <span>{loading ? 'Loading' : 'Skicka'}</span>
          </button>
        </div>
        <p>
          Har du redan ett konto?{' '}
          <Link href="/signin">
            <a>logga in</a>
          </Link>
        </p>
      </div>
    </div>
  )
}
