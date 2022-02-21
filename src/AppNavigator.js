import { auth } from "firebase"
import Dashboard from "./Views/dashboard/Dashboard"
import { Login } from "./Views/login_test"

const AppNavigator = ({}) => {
    const isAuthenticated = _.isEmpty(auth().currentUser)
    
    if(isAuthenticated) return <Link to="dashboard" />
    else return <Login />

}

export default AppNavigator;