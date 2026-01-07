import Profile from "@/components/admin/profile"
import Link from "next/link"

const AdminPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">ADMIN</h1>
      <Profile />
      <Link className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"  href="/dashboard">Dashboard</Link>
    </>
  )
}

export default AdminPage
