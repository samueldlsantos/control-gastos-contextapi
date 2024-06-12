import { PropsWithChildren } from "react"

const ErrorMessage = ({children} : PropsWithChildren) => {
  return (
    <p className="p-2 w-full text-center bg-red-600 text-white">{children}</p>
  )
}

export default ErrorMessage