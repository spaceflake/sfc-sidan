import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="navbar bg-base-300">
      <div>
        <Image src="/sfclogowh.png" alt="SFC Logo" width={50} height={30} />
        <h1 className="text-xl ">SFC - Swedish Forza Championship</h1>
      </div>
    </nav>
  )
}

export default Navbar
