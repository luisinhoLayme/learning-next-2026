import Link from "next/link"

interface Props {
  email: string
}

const Verify = ({ email }: Props) => {

  return (
      <section className="
        max-w-72 sm:max-w-80 md:max-w-96 bg-white mx-auto shadow-md
        -translate-y-30 sm:-translate-y-46 xl:-translate-y-70
        grid gap-4 p-4 rounded-lg
        ">
        <h1 className="font-medium md:text-2xl">First, Let's verify your email</h1>
        <p className="text-sm md:text-base text-secondary">Check <span className="text-primary-variant">{ email }</span> to verify
          your account and get started</p>
        <div className="flex gap-3">
          <button className="text-sm text-white bg-primary px-4 py-2 rounded-lg cursor-pointer">Open Gmail</button>
          <button className="text-sm border border-secondary px-4 py-2 rounded-lg cursor-pointer">Resend Email</button>
        </div>
        <p className="text-sm text-secondary">Need help? <Link className="text-primary-variant" href="/support">Visit support</Link> or <Link className="text-primary-variant" href="/contact-us">contact us</Link></p>
      </section>
  )
}

export default Verify
