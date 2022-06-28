import Account from '../components/Account'

const Profile = ({ session }) => {
  return (
    <>
      <Account key={session?.user?.id} session={session} />
    </>
  )
}

export default Profile
