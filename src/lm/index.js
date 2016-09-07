import Chart from "./Chart";

const now = new Date();
const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const   to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);

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
