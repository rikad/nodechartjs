var ctx = document.getElementById('canvas').getContext('2d');

var config = {
	type: 'line',
	data: {
		labels: ['1', '2', '3', '4', '5', '6', '7'],
		datasets: [{
			label: 'Garis 1',
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor()
			],
			fill: false,
		}, {
			label: 'Garis 2',
			fill: false,
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor()
			],
		}]
	}
};

var mychart = new Chart(ctx, config);

new RadialGauge({
	renderTo: 'gauge',
	width: 400,
	height: 400,
	units: 'Km/h',
	title: false,
	value: 0,
	minValue: 0,
	maxValue: 220,
	majorTicks: [
		'0','20','40','60','80','100','120','140','160','180','200','220'
	],
	minorTicks: 2,
	strokeTicks: false,
	highlights: [
		{ from: 0, to: 50, color: 'rgba(0,255,0,.15)' },
		{ from: 50, to: 100, color: 'rgba(255,255,0,.15)' },
		{ from: 100, to: 150, color: 'rgba(255,30,0,.25)' },
		{ from: 150, to: 200, color: 'rgba(255,0,225,.25)' },
		{ from: 200, to: 220, color: 'rgba(0,0,255,.25)' }
	],
	colorPlate: '#222',
	colorMajorTicks: '#f5f5f5',
	colorMinorTicks: '#ddd',
	colorTitle: '#fff',
	colorUnits: '#ccc',
	colorNumbers: '#eee',
	colorNeedle: 'rgba(240, 128, 128, 1)',
	colorNeedleEnd: 'rgba(255, 160, 122, .9)',
	valueBox: true,
	animationRule: 'bounce',
	animationDuration: 500
}).draw();

async function getData() {
	var response = await fetch('http://localhost:3000/api/data');
	var data = await response.json();

	changeChart(data.line1,data.line2);
	changeGauges(data.gauge);

	setTimeout(function(){ getData() }, 1000); //delay 1 seconds and loop			
}

function changeGauges(value) {
    document.gauges.forEach(function(gauge) {
		gauge.value = value;
    });
}

function changeChart(line1,line2) {
	if (config.data.datasets.length > 0) {				
		config.data.datasets[0].data.shift();
		config.data.datasets[1].data.shift();
	}

	config.data.datasets[0].data.push(line1);
	config.data.datasets[1].data.push(line2);

	mychart.update();
}

getData(); //start
