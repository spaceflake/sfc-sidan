import Image from 'next/image'
import Link from 'next/link'
import Auth from './Auth'

const Navbar = () => {
  return (
    <nav className="navbar bg-base-300 ">
      <div className="flex justify-between w-full">
        <Link href="/" passHref>
          <Image
            src="/sfclogowh.png"
            alt="SFC Logo"
            width={50}
            height={30}
            className=" cursor-pointer"
          />
        </Link>
        <h1 className="text-xl ">SFC - Swedish Forza Championship</h1>
        <div className=" space-x-4">
          <Link href="/admin">ADMIN</Link>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn m-1">
              Logga In
            </label>
            <div tabIndex="0" className="dropdown-content">
              <Auth />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
