import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [])

  return (
    <div>
      <h1>Ojdå...</h1>
      <p>Sidan du sökte efter finns inte.</p>
      <p>
        Gå tillbaka till <Link href="/">Startsidan</Link>
      </p>
    </div>
  )
}

export default NotFound
