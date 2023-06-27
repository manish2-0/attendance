import react, { useState } from "react";
import SearchContext from "./SearchContext";

const SearchState = (props) => {

    const [data, setdata] = useState({
        "er_no": "-",
        "month": "-",
        "year": "-"
    });

    const [attendance, setattendance] = useState([]);
    const [attendance2, setattendance2] = useState([]);



    return (
        <SearchContext.Provider value={{ data, setdata, attendance, setattendance, attendance2, setattendance2 }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState;