angular.module('weatherFocast')
    .controller('DetailsController', function ($scope, $stateParams) {

        console.log($stateParams.data)
        $scope.timezone = $stateParams.data.timezone;
        $scope.temperature = $stateParams.data.temperature;

        var canvas = document.getElementById("myChart");
        var data = {
            labels: $scope.timezone,
            datasets: [
                {
                    label: "Temperature",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: $scope.temperature,
                }
            ]
        };


        var option = {
            showLines: true
        };
        var myLineChart = Chart.Line(canvas, {
            data: data,
            options: option
        });
        // Clear array for next click
        $scope.timezone.length = 0;
        $scope.temperature.length = 0;
    
});