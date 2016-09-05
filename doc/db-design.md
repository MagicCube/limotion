# Database Design

## Sensor Data Collection
### Collection Naming
`"sensor-data-" + sensorName`

Example: `sensor-data-xxxx`

### Options
**NOTE:** Make sure to set [noPadding](https://docs.mongodb.com/manual/core/mmapv1/#exact-fit-allocation) to `true`.

### Structure
```js
{
    _id: ObjectId(),
    timestamp: 1475650800000, // 2016-09-05 15:00
    values: [
        {
            // 2016-09-05 15:00
            temperature: 31,
            humidity: 42
        },
        {
            // 2016-09-05 15:01
            temperature: 32,
            humidity: 41
        },
        ... // 60 value objects, each of which has temperature and humidity.
    ],
    // Stats update every time when values update.
    stats: {
        temperature: {
            max: 32,
            min: 29,
            avg: 30,
            // in order to calculate average,
            // we need to keep the numbers and sum of non-null values as well.
            total: 60,
            sum: 1800
        },
        humidity: {
            max: 47,
            min: 40,
            avg: 43,
            total: 60,
            sum: 2580
        }
    }
}
```

### Indexes
* _id (Auto)
* timestamp







## Sensor Meta Collection
## Sensor Instance Collection
