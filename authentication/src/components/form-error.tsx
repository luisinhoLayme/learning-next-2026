import { type FC } from 'react'

interface Props {
  error?: string[]
}

const FormError:FC<Props> = ({ error }) => {
  if (!error) return null

  return error.map((err, index) => (
    <div key={index} className="text-pink-500 text-xs italic">{err}</div>
  ))
}

export default FormError
