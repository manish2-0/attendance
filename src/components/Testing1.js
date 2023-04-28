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


    const delayedhours = () => {
        var startDate = new Date(0, 0, 0, 9, 45, 0);
        var endDate = new Date(0, 0, 0, time1[0], time1[1], 0);

        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        setresponse(hours + ":" + minutes);
        return [hours, minutes];

    }

    const submitform = (e) => {
        e.preventDefault();

        // console.log(time1[0])
        // console.log(time2[0])

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

        if ((time1[0] >= 6 && time1[0] <= 8 && time1[1] >= 0 && time1[1] <= 59) || (time1[0] == 9 && time1[1] >= 0 && time1[1] <= 45)) { // Intime morning 6:00 to 9:45

            if ((time2[0] == 18 && time2[1] >= 30) || (time2[0] == 19 && time2[1] <= 30)) {       //Outtime condition 1 (normal time)

                setpresent(1);
                setdelay(0);
                setovertime(0);
                setundertime(0);

            }


            if ((time2[0] == 19 && time2[1] >= 31) || (time2[0] >= 20 && time2[1] >= 0 && time2[1] <= 59))  //Outtime condition 2 (overtime)
            {
                // Present = 1 
                setpresent(1);
                // Add extra present

                let extra = extraworkinghours();
                let extraminutes = extra[0] * 60 + extra[1];
                let a = (extraminutes / 15).toFixed(1);
                setovertime(a);

                setdelay(0);
                setundertime(0);


            }

            if ((time2[0] <= 18 && time2[1] <= 29) || (time2[0] < 18 && time2[1] <= 59 && time2[1] >= 0))  //Outtime condition 3 (undertime)
            {
                setpresent(1);

                let under = underworkinghours();

                let underminutes = under[0] * 60 + under[1];

                let quot = parseInt((underminutes / 30));
                let rema = (underminutes % 30);

                let final;
                if (rema > 0 && rema <= 29) {
                    final = quot + 1;
                }
                else {
                    final = quot;
                }
                setundertime(final);

                setovertime(0);
                setdelay(0);

            }
        }



        if ((time1[0] == 9 && time1[1] > 45) || (time1[0] >= 10 && time1[1] >= 0 && time1[1] <= 59)) {      //If a person comes late after 9:45
            setpresent(0);
            setdelay(0);
            setovertime(0);
            setundertime(0);

            let under = delayedhours();

            let underminutes = under[0] * 60 + under[1];

            let quot = parseInt((underminutes / 30));
            let rema = (underminutes % 30);

            let final;
            if (rema > 0 && rema <= 29) {
                final = quot + 1;
            }
            else {
                final = quot;
            }

            setdelay(final);


            if ((time2[0] == 18 && time2[1] >= 30) || (time2[0] == 19 && time2[1] <= 30))   //Outtime condition 1 (normal time)
            {
                setpresent(1);
                setovertime(0);
                setundertime(0);
            }

            if ((time2[0] == 19 && time2[1] >= 30) || (time2[0] >= 20 && time2[1] >= 0 && time2[1] <= 59))  //Outtime condition 2 (overtime)
            {
                setpresent(1);

                let extra = extraworkinghours();
                let extraminutes = extra[0] * 60 + extra[1];
                let a = (extraminutes / 15).toFixed(1);
                setovertime(a);

                setundertime(0);
            }


            if ((time2[0] <= 18 && time2[1] <= 29) || (time2[0] < 18 && time2[1] <= 59 && time2[1] >= 0))  //Outtime condition 3 (undertime)
            {
                setpresent(1);

                let under = underworkinghours();

                let underminutes = under[0] * 60 + under[1];

                let quot = parseInt((underminutes / 30));
                let rema = (underminutes % 30);

                let final;
                if (rema > 0 && rema <= 29) {
                    final = quot + 1;
                }
                else {
                    final = quot;
                }
                setundertime(final);

                setovertime(0);

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

                {/* <p>{response}</p> */}

                <>
                    <p>Present:{present}</p>
                    <p>Delay:{delay}</p>
                    <p>Overtime:{overtime}</p>
                    <p>Undertime:{undertime}</p>
                </>
            </div>

        </>
    )
}

export default Testing1