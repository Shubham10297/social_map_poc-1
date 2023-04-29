import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import './Toaster.css'



export const Toaster = (identifier, message, timeout = 2000) => {
 toast[identifier](message, {
   position: toast.POSITION.BOTTOM_RIGHT,
   autoClose: timeout,
   hideProgressBar: false,
   pauseOnHover: false,
   Transition:'zoom',
   theme: "dark",
 })
}
