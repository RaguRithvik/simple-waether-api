import { useState } from 'react';
import ApiUrl from "./apiURL";

function App() {
  const key = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState({
    celsius: 100,
    name: "London",
    humidity: 10,
    speed: 2,
    img: ""
  })

  const [search, setsearch] = useState("");

  if (!localStorage.getItem("location")) {
    localStorage.setItem("location", "[]");
  }
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("location")));

  const api = async (data) => {
    await ApiUrl.get(`?q=${data}&appid=${key}&units=metric`).then(res => {
      if (res) {
        setData({
          celsius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          img: "https://openweathermap.org/img/wn/" + res.data.weather[0].icon + "@2x.png"
        })
        history.push({ "location": search })
        localStorage.setItem("location", JSON.stringify(history))
        setsearch("")
      }
    }
    ).catch(err => alert("no data found"))
  }
  const handleOnClickHistory = (data) => {
    api(data)
  }

  return (
    <div className="App">
      <input
        name="search"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      /> <button onClick={() => api(search)}>Search Button </button>
      <p>celsius: {Math.round(data.celsius)}<sup>o</sup>C</p>
      <p>name: {data.name}</p>
      <p>humidity: {Math.round(data.humidity)}</p>
      <p>speed: {Math.round(data.speed)}</p>
      <img src={data.img !== "" ? data.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3KODPtlPDWvokCPNIXaRqQ1fTQh1iQHwFmA&usqp=CAU"} height={80} width={80} alt="tes" />

      <h5>history</h5>
      {history?.length > 0 && history?.map((data, i) => {
        return (
          <div key={i}>
            <p onClick={() => { handleOnClickHistory(data?.location) }}>{data?.location}</p>
          </div>
        )
      })}
      {history?.length > 0 && <button onClick={() => { localStorage.clear(); setHistory([]) }}>Remove history</button>}
    </div>
  );
}

export default App;
