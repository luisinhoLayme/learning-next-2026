import { type FC } from 'react'

interface Props {
  title: string
}

const ButtonGoogle: FC<Props> = ({ title }) => {
  return (
    <button className="flex gap-4 items-center p-2 px-8 border border-secondary/50 w-full rounded-lg cursor-pointer">
      <div className="w-8">
        <img src="/google.svg" alt="google" />
      </div>
      <div className="border-l pl-3 border-l-secondary/40">
        { title }
      </div>
    </button>
  )
}

export default ButtonGoogle
