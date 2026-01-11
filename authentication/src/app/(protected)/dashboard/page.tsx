// import Profile from '@/components/admin/profile'
// import Link from 'next/link';
import Stats from '@/components/dashboard/stats'
import UserChart from '@/components/dashboard/user-chart'
import UsersTable from '@/components/dashboard/users-table'

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const DashboardPage = async () => {
  // await delay(4000)

  return (
    <>
      <Stats />
      <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-6">
        <h3 className="text-sm font-semibold mb-4">Crecimiento de usuarios</h3>
        <UserChart />
      </section>
      <UsersTable />
    </>
  )
}

export default DashboardPage
