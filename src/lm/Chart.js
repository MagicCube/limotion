export default class Chart
{
    constructor(element)
    {
        this._element = element;

        this._c3 = c3.generate({
            bindto: this._element,
            data: {
                x: "timestamp",
                columns: []
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: function(x) { return x.toTimeString().substr(0, 5); },
                        count: 24 + 1
                    },
                    padding: 0
                },
                y: {
                    label: "Temperature",
                    min: 0,
                    max: 100,
                    default: [ 0, 100 ],
                    padding: 0
                },
                y2: {
                    label: "Humidity %",
                    show: true,
                    min: 0,
                    max: 100,
                    default: [ 0, 100 ],
                    padding: 0,
                }
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            point: {
                show: false
            }
        });
    }

    setData(rawData, from, to)
    {
        const data = {
            x: "timestamp",
            axes: {
                temperature: "y",
                humidity: "y2"
            },
            colors: {
                temperature: "red",
                humidity: "blue"
            },
            columns: [
                ["timestamp"],
                ["temperature"],
                ["humidity"]
            ],
            types: {
                temperature: "area",
                humidity: "area"
            }
        };
        rawData.forEach((row, i) => {
            data.columns[0].push(new Date(from * 1 + i * 60 * 1000));
            data.columns[1].push(row.temperature === Number.MIN_SAFE_INTEGER ? null : row.temperature);
            data.columns[2].push(row.humidity === Number.MIN_SAFE_INTEGER ? null : row.humidity);
        });

        this._c3.load(data);
    }
}
