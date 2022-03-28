import React, { useState, useEffect } from 'react'
import Socket from 'socket.io-client'
import Chart from 'react-apexcharts'


const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/";
function LiveChart() {

    const socket = Socket(ENDPOINT);
    const [Status, setStatus] = useState('resume');
    const [XY, setXY] = useState({ X: [49], Y: [63] });

    //chart options and series
    const RealTImeSeriesAndOptions = {
        series: [{
            name: "Live Chart X",
            data: XY.X,
        },
        /* {
            name: "Live Chart Y",
            data: XY.Y,
        } */],
        options: {
            chart: {
                animations: {
                    enabled: false,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                    // type: [0, 0, 0]
                },
            },
            grid: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            yaxis: {
                max: 100,
                title: {
                    text: 'Random'
                },
                color: 'white'
            },
            xaxis: {
                categories: XY.X
            },

            title: {
                text: 'Dynamicly Updating Chart Using Socket.io',
                align: 'left',
                style: {
                    fontSize: '18px',
                    color: 'Black'
                }
            },
            markers: {
                size: 0
            },
            tooltip: {
                show: true,
                style: {
                    fontSize: '18px',
                    color: 'Black'
                }
            },
            legend: {
                show: true
            },
        }
    };

    const stopLiveData = () => {
        socket.emit('stopLiveData');
        setStatus('pause');
    }
    useEffect(() => {
        //to trigger the event on the server
        socket.emit('getChartValuesXY', { id: 2 });
        // to get the data after the event is triggered
        socket.on('result', data => {
            if (XY.X.length >= 10) {
                setXY({ X: [...XY.X.shift(), data.X], Y: [...XY.Y.shift(), data.Y] })
            }
            else
                setXY({ X: [...XY.X, data.X], Y: [...XY.Y, data.Y] })
        })

    }, [XY, socket]);

    return (
        <div className='LiveChart bg-white text-slate-50 h-full  flex justify-center items-center flex-col' >
            <Chart
                options={RealTImeSeriesAndOptions.options}
                series={RealTImeSeriesAndOptions.series}
                type="area"
                width='800'
            />
            <button onClick={stopLiveData} className='btnLiveDataStop text-black px-2 py-1 border-color-[black]'>{Status === 'resume' ? 'Stop Live Data' : 'Live Data Stopped'}</button>
        </div>
    )
}

export default LiveChart