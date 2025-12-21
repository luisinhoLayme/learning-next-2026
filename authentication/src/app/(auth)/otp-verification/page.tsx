import OTPVerification from '@/components/auth/form-otp'

const OtpVerification = () => {
  return (
    <section>
      <p className="text-7xl sm:text-8xl text-center font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">L.</p>
      <h1 className="text-3xl text-center mt-5 font-mochiy-pop-one ">OTP Verification</h1>

      <div className="max-w-md mx-auto">
        <p className="text-secondary font-sans text-sm text-center my-5">
          Enter the OTP code sent to your email address
        </p>
          <OTPVerification />
      </div>
    </section>
  )
}

export default OtpVerification
