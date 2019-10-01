var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('mqtt/demo', function (err) {
    if (!err) {
      //kirimData()  //send only once
      setInterval(function(){ kirimData() }, 2000);  //loop and send data
    } else {
      console.log('can\'t connect to mqtt broker')
    }
  })
})


function kirimData() {
    var data = {
        line1 : Math.floor(Math.random() * 100),
        line2 : Math.floor(Math.random() * 100),
        gauge : Math.floor(Math.random() * 100)
    }

    var string = JSON.stringify(data) //change data to string

    client.publish('mqtt/demo', string) //send to broker
}


