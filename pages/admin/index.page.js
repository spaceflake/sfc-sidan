import Link from 'next/link'

const AdminDashboard = () => {
  return (
    <div className="flex-1 bg-slate-800 grid place-content-center">
      <div>
        <h1 className=" font-extrabold text-6xl">Admin Dashboard</h1>
        <p>
          Create events,{' '}
          <Link href="/admin/CreateLdb" passHref>
            <span className="text-green-600 cursor-pointer">
              update leaderboard
            </span>
          </Link>
          other functions.
        </p>
      </div>
      <div className=" flex space-x-4 mt-8">
        <div className=" w-60 h-60 bg-slate-400"></div>
        <div className=" w-60 h-60 bg-slate-400"></div>
        <div className=" w-60 h-60 bg-slate-400"></div>
      </div>
    </div>
  )
}

export default AdminDashboard
