import React, { useState, useEffect } from 'react'
import Socket from 'socket.io-client'
import Chart from 'react-apexcharts'


const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/";
const options = {
    chart: {
        id: "basic-bar"
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
}
function LiveChart() {

    const socket = Socket(ENDPOINT);
    const [Status, setStatus] = useState('resume');
    const [XY, setXY] = useState({
        X: [],
        Y: []
    });
    useEffect(() => {
        //to trigger the event on the server
        socket.emit('getChartValuesXY', { id: 2 });
        // to get the data after the event is triggered
        socket.on('result', data => {
            setXY(prevValue => {
                return {
                    X: [...prevValue.X, data.X],
                    Y: [...prevValue.Y, data.Y]
                }
            })
        })
    }, []);

    const stopLiveData = () => {
        if (Status === 'resume') {
            socket.emit('stopLiveData');
            setStatus('pause')
        }
        else {
            socket.emit('getChartValuesXY');
            setStatus('resume')
        }
    }
    return (
        <div className='text-slate-50'>
            {/* <Chart
                options={options}
                series={XY.X}
                type="line"
                width="500"
            /> */}
            <p>X {'==>'} {XY.X}</p>
            <br></br>
            <p>Y {'==>'} {XY.Y}</p>
            <button onClick={stopLiveData} className='btnLiveDataStop px-2 py-1 border-color-[white]'>{Status === 'resume' ? 'Stop Live Data' : 'Resume Live Data'}</button>
        </div>
    )
}

export default LiveChart