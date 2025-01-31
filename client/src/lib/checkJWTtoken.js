import { useCookies } from "react-cookie";
export function useAuth() {
    const [cookies] = useCookies();
    const cookie = cookies['token']
    console.log(cookie)
    if (cookie) return true;
    else return false;

}