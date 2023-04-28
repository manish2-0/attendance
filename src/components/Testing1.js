import React, { useState } from 'react'

const Testing1 = () => {
    const [time1, settime1] = useState("");
    const [time2, settime2] = useState("");
    const [response, setresponse] = useState("");

    // const [intime, setintime] = useState(["01", "00"]);
    // const [outtime, setouttime] = useState([19, 30]);

    const [present, setpresent] = useState(0);
    const [delay, setdelay] = useState(0);
    const [overtime, setovertime] = useState(0);
    const [undertime, setundertime] = useState(0);



    const handlechange = (e) => {
        e.preventDefault();

        let val;

        val = e.target.value.split(":");

        if (e.target.name == "time1") {
            settime1(val);
        }

        if (e.target.name == "time2") {
            settime2(val);
        }
    }

    const extraworkinghours = () => {
        var startDate = new Date(0, 0, 0, 19, 30, 0);
        var endDate = new Date(0, 0, 0, time2[0], time2[1], 0);

        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        setresponse(hours + ":" + minutes);
        return [hours, minutes];

    }

    const underworkinghours = () => {
        var startDate = new Date(0, 0, 0, time2[0], time2[1], 0);
        var endDate = new Date(0, 0, 0, 18, 30, 0);

        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        setresponse(hours + ":" + minutes);
        return [hours, minutes];

    }

    const submitform = (e) => {
        e.preventDefault();

        console.log(time1[0])
        console.log(time2[0])

        if (time1 == "" || time2 == "") {
            setresponse("Please select both times");
            return 0;
        }

        if (time1[0] > time2[0]) {
            console.log("In first if")
            setresponse("Please enter a valid time");
            return 0;
        }

        if (time1[1] >= time2[1] && time1[0] == time2[0]) {
            console.log("In second if")
            setresponse("Please enter a valid time");
            return 0;
        }

        if ((time1[0] >= 6 && time1[0] <= 8 && time1[1] >= 0 && time1[1] <= 59) || (time1[0] == 9 && time1[1] >= 0 && time1[1] <= 45)) {            // Intime morning 6:00 to 9:45
            if ((time2[0] == 18 && time2[1] >= 30) || (time2[0] == 19 && time2[1] <= 30)) {       //Outtime condition 1 (normal time)
                // Present = 1 
                setpresent(1);
                console.log("single present")
                console.log(present)

            }

            if ((time2[0] == 19 && time2[1] >= 31) || (time2[0] >= 20 && time2[1] >= 0 && time2[1] <= 59))  //Outtime condition 2 (overtime)
            {
                // Present = 1 
                setpresent(1);
                // Add extra present
                let extra = extraworkinghours();
                console.log("single present")
                console.log(extra)
            }

            if ((time2[0] <= 18 && time2[1] <= 29) || (time2[0] < 18 && time2[1] <= 59 && time2[1] >= 0))  //Outtime condition 3 (undertime)
            {
                console.log("Underworking Time")
                let a = underworkinghours();
                console.log(a)
            }
        }



        if ((time1[0] == 9 && time1[1] >= 45) || (time1[0] >= 10 && time1[1] >= 0 && time1[1] <= 59)) {      //If a person comes late after 9:45
            if ((time2[0] == 18 && time2[1] >= 30) || (time2[0] == 19 && time2[1] <= 30)) {                    //Outtime condition 1 (normal time)
                // Present = 1
                // Subtract delay present
            }

            if ((time2[0] == 19 && time2[1] >= 30) || (time2[0] >= 20 && time2[1] >= 0 && time2[1] <= 59))  //Outtime condition 2 (overtime)
            {
                // Present = 1
                // Subtract delay present
                // Add extra present
            }
        }






    }

    return (
        <>
            <div className="App">

                <form onSubmit={submitform}>
                    <input name="time1" onChange={handlechange} className='border border-gray-600' type="time" />
                    <p>start time:{time1}</p>
                    <input name="time2" onChange={handlechange} className='border border-gray-600' type="time" />
                    <p>end time:{time2}</p>
                    <button className='ani-button'>Submit</button>
                </form>

                <p>{response}</p>
            </div>

        </>
    )
}

export default Testing1