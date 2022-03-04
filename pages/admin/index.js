import Link from 'next/link'

const AdminDashboard = () => {
  return (
    <div className="flex-1">
      <h1>Admin Dashboard</h1>
      <p>
        Create events,{' '}
        <Link href="/admin/CreateLdb" passHref>
          <span className="text-green-600 cursor-pointer">
            update leaderboard
          </span>
        </Link>
        update leaderboard and other functions
      </p>
    </div>
  )
}

export default AdminDashboard
