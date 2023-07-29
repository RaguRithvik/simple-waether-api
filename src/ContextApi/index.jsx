import React, { useContext, useState } from "react";
import { HistoryContex } from "./HistoryContext";
import ApiUrl from "./ApiUrl";
function ContextApiFun() {
    const { history, setSearchHistory } = useContext(HistoryContex);
    const [searchdata, setSearchData] = useState("")
    const [name, setName] = useState("London");
    const [img, setImage] = useState("https://openweathermap.org/img/wn/10d@2x.png");
    const [temp, setTempature] = useState(0);
    const key = process.env.REACT_APP_API_KEY

    const addLocation = async (data) => {
        await ApiUrl.get(`?q=${data}&appid=${key}&units=metric`).then(res => {
            if (res) {
                setTempature(res.data?.main?.temp);
                setName(res.data?.name);
                setImage(`https://openweathermap.org/img/wn/${res.data?.weather[0]?.icon}@2x.png`);
                setSearchHistory((pre) => {
                    return [...pre, searchdata]
                })
                setSearchData("")
            }
        }).catch(err => alert(err))
    }

    return (
        <>
            <h1>Context API</h1>
            <input
                type="text"
                value={searchdata}
                onChange={(e) => setSearchData(e.target.value)}
            />  <button onClick={() => addLocation(searchdata)}>
                Add Location
            </button>
            <h3>
                Tempareture {Math.round(temp)}<sup>0</sup> C
                <br />
                Name: {name}
                <br />
                <img src={img} alt="" />
            </h3>
            {
                history?.length > 0 && history.map((data, i) => {
                    return (
                        <div key={i}>
                            <p
                                onClick={() => {
                                    addLocation(data);
                                }}>
                                {data}
                            </p>
                        </div>
                    )
                })
            }
        </>)
}
export default ContextApiFun;