var ctx = document.getElementById("csvChart");
console.log(ctx)

//const wavedata = getWaveData()
/*
var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: wavedata["time"],
        datasets: [
            {
                label: "電圧",
                data: wavedata["voltage"],
                borderColor: "rgba(255, 99, 132, 1)", //線の色
                backgroundColor: "rgba(255, 99, 132, 0.1)" //塗りつぶしの色
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "時間(s)"
                    },
                    ticks: {
                        min: 0,
                        max: 1.0*10e-6,
                        stepSize: 1.0*10e-7,
                        callback: function(label, index, labels) {
                            if (label / 1.0*1e-7 >= 1) {
                                return label/1.0*1e-7;
                            } else{
                                return 0;
                            }
                        }
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "電圧"
                    },
                    ticks: {
                        min: 1.0,
                        max: 3.0,
                        stepSize: 0.1
                    }
                }
            ]
        }
    }
});
*/

// https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  myChart.options.scales.xAxes[0].ticks.min = 0;
  myChart.options.scales.xAxes[0].ticks.max = 4.0*10e-7;
  myChart.update();
}


//getWaveData();

// CSV関連
//ボタンイベントリスナー
document.getElementById('getcsv').addEventListener("click", getWaveData);

// wavadata を jsonで取得
function getWaveData() {
    var r = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    r.open("get", "/wavedata", true); // アクセスするファイルを指定
    r.send(null); // HTTPリクエストの発行

    r.onload = function () {
        wd = JSON.parse(r.response)
        createWaveChartFromJSON(wd);
        //return wd;
    }
}

// Chart の scaleを変更
function onButton24() {
    myChart.options.scales.xAxes[0].ticks.min = "0:00";
    myChart.options.scales.xAxes[0].ticks.max = "23:59";
    myChart.update();
}

//　Chart の scaleを変更
function onButton() {
    myChart.options.scales.xAxes[0].ticks.min = "09:00";
    myChart.options.scales.xAxes[0].ticks.max = "20:00";
    myChart.update();
}

function saveChartJPG() {

}

function createWaveChartFromJSON(wavedata) {
    //var ctx = document.getElementById("csvChart");
    console.log(ctx)
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: wavedata["time"],
            datasets: [
                {
                    label: "電圧",
                    data: wavedata["voltage"],
                    borderColor: "rgba(255, 99, 132, 1)", //線の色
                    backgroundColor: "rgba(255, 99, 132, 0.1)" //塗りつぶしの色
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "時間(s)"
                        },
                        ticks: {
                            min: 0,
                            max: 1.0*10e-6,
                            stepSize: 1.0*10e-7,
                            callback: function(label, index, labels) {
                                if (label / 1.0*1e-7 >= 1) {
                                    return label/1.0*1e-7;
                                } else{
                                    return 0;
                                }
                            }
                        }
                    }
                ],
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "電圧"
                        },
                        ticks: {
                            min: 1.0,
                            max: 3.0,
                            stepSize: 0.1
                        }
                    }
                ]
            }
        }
    });
}
