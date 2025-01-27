import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
export function useAuth() {
    const [cookies] = useCookies();
    console.log(Cookies.get("token"))
    console.log(cookies)
    const cookie = cookies['token']
    console.log(cookie)
    if (cookie) return true;
    else return false;

}