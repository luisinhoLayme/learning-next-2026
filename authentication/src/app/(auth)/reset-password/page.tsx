import ResetPasswordForm from './reset-form'

const ResetPassword = () => {
  return (
    <section>
      <p className="text-7xl sm:text-8xl text-center font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">L.</p>
      <h1 className="text-3xl text-center mt-5 font-mochiy-pop-one ">Reset Password</h1>

      <div className="max-w-md mx-auto">
        <p className="text-secondary font-sans text-sm text-center my-5">
          Enter a new password for <span className="text-primary-variant">your@example.com</span>
        </p>
          <ResetPasswordForm />
      </div>
    </section>
  )
}

export default ResetPassword
