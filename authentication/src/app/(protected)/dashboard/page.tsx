import Profile from '@/components/admin/profile'
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const DashboardPage = async () => {
  // await delay(4000)

  return (
    <>
      <h1>Dashboard Page</h1>
      <Profile />
      <p>xd xd</p>
    </>
  )
}

export default DashboardPage
