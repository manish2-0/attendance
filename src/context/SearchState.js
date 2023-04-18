import react, { useState } from "react";
import SearchContext from "./SearchContext";

const SearchState = (props) => {

    const [data, setdata] = useState({
        "er_no": "-",
        "month": "-",
        "year": "-"
    });

    const [attendance, setattendance] = useState([]);

    return (
        <SearchContext.Provider value={{ data, setdata, attendance, setattendance }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState;