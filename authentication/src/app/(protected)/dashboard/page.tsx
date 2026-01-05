
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const DashboardPage = async () => {
  await delay(4000)

  return (
    <>
      <h1>Dashboard Page</h1>
      <p>xd xd</p>
    </>
  )
}

export default DashboardPage
