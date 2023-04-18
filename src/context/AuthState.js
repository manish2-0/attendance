import react,{useState} from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const [auth, setauth] = useState({});
    const [adminname, setadminname] = useState("");

  return (
    <AuthContext.Provider value={{auth,setauth,adminname, setadminname}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;