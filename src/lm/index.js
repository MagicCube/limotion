import Chart from "./Chart";

const from = new Date(Date.parse("2016-09-06T02:00"));
const   to = new Date(Date.parse("2016-09-07T02:00"));

const chart = new Chart(document.getElementById("chart"));
loadData(from, to);

function loadData(from, to)
{
    $.ajax({
        url: "/api/sensor/dht11-living-room/data",
        data: {
            from: from.toJSON(),
            to: to.toJSON()
        }
    }).then(data => {
        chart.setData(data, from, to);
    });
}
