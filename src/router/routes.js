
import { useRoutes } from "react-router-dom";
import Homepage from '../views/homepage'
import Notfound from '../views/notfound'

const Allroutes=()=>{
    const routes = useRoutes( [
        {
            path:'/',
            element:<Homepage/>,
            exact:true
        },
        {
            path:'*',
            element:<Notfound/>
        }
    ])
    return routes
}



export default Allroutes