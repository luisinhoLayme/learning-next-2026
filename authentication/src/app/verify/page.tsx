import Verify from '@/components/verify'
import { getAuthenticatedUser } from '@/lib/session';
import { permanentRedirect } from 'next/navigation';

const VerifyPage = async() => {
  const user = await getAuthenticatedUser()

  if(user.verify) permanentRedirect('/')

  return (
    <main className="overflow-hidden">
      <section className="
        relative
        w-[150%] h-[50vh]
        -translate-x-36
        -translate-y-20
        min-[520px]:-translate-y-30
        min-[670px]:-translate-y-40
        min-[815px]:-translate-y-50
        min-[815px]:h-[55vh]
        min-[1238px]:-translate-y-60
        min-[1440px]:-translate-y-65
        -rotate-20
        min-[815px]:-rotate-15
        min-[1440px]:-rotate-10
        min-[1440px]:h-[60vh]
        bg-[linear-gradient(to_bottom,#ff4b72_0%,#a33ccc_50%,#9e6034_75%,#992d44_100%)]
        ">
      </section>
      <Verify email={user.email} />
    </main>
  )
}

export default VerifyPage
