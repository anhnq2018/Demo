// MODULES
angular.module('weatherFocast', ['ngMaterial', 'ngMessages', 'ngMdIcons', 'chart.js', 'ui.router'])
    .controller('myCtrl', function ($scope, $http, filterFilter, $log) {


        $scope.searchText = '';
        $scope.currentOption = 1;

        //City list
        $scope.cityArray = [
            { fullName: 'Hanoi, Vn', cityCode: 'Hanoi', countryCode: "VN" },
            { fullName: 'Kabul, Afghanistan', cityCode: 'Kabul', countryCode: "AF" },
            { fullName: 'Minsk, Belarus', cityCode: 'Minsk', countryCode: "BY" },
            { fullName: 'Beijing, China', cityCode: 'Beijing', countryCode: "CN" },
            { fullName: 'Quito, Ecuador', cityCode: 'Quito', countryCode: "EC" }
        ];
        
        //Show first city in list
        $http({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + $scope.cityArray[0].cityCode + "," + $scope.cityArray[0].countryCode + "&appid=7224afea67b5a9728f5c13842af62ff4"
        }).then(function SuccessCall(response) {
            $scope.days = response.data.list;
            $scope.city = response.data.city;
            $scope.dayGroup = [];
            $scope.details = [];
            $scope.timezone = [];
            $scope.temperature = [];
            $scope.selectedDay = null;

            // Format datetime
            var dateobj = new Date();
            var D = dateobj.getDate();
            var M = dateobj.getMonth();
            var Y = dateobj.getFullYear();
            for (var i = 0; i < 5; i++) {
                var monthNames = [
                    "01", "02", "03",
                    "04", "05", "06", "07",
                    "08", "09", "10",
                    "11", "12"
                ];
                if (D < 10) {
                    D = '0' + D
                }

                if (M == 3 || M == 5 || M == 8 || M == 10 && D > 30)
                    return D == 1;
                else if (M == 1) {
                    Boolean(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
                    if (Boolean && D > 29)
                        return D == 1;
                    else if (D > 28)
                        return D == 1;
                }

                var dateString = Y + '-' + monthNames[M] + '-' + D;
                $scope.dayGroup.push(filterFilter($scope.days, { dt_txt: dateString }));
                D++;
            }
            console.log($scope.dayGroup);

            $scope.dayDetails = $scope.dayGroup[0][0];
            $scope.dayDetails.time = $scope.dayDetails.dt_txt.split(" ")[1];
            $scope.selectedDay = $scope.dayGroup[0];

            $scope.FuncShow($scope.selectedDay, $scope.dayDetails);

            //Get date
            $scope.convertDateTime = function (day) {
                day.date = day.dt_txt.split(" ")[0];
            }
        });
        

        $scope.createFilterFor = function (query) {
            lowercaseQuery = query.toLowerCase();
            return function filterFn(country) {
                return (country.fullName.toLowerCase().indexOf(lowercaseQuery) === 0);
            };
        }

        $scope.querySearch = function (query) {
            var results = query ? $scope.cityArray.filter($scope.createFilterFor(query)) : $scope.cityArray
            return results;
        }

        $scope.selectedItemChange = function (item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            console.log(item)
        }

        $scope.showDetails = true;
        
        $scope.resultClick = function () {
            $scope.showDetails = true;

            console.log($scope.selectedItem)
            var item = $scope.selectedItem

            $http({
                method: "GET",
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + item.cityCode + "," + item.countryCode + "&appid=7224afea67b5a9728f5c13842af62ff4"
            }).then(function SuccessCall(response) {
                $scope.days = response.data.list;
                $scope.city = response.data.city;
                $scope.dayGroup = [];
                $scope.details = [];
                $scope.timezone = [];
                $scope.temperature = [];
                $scope.selectedDay = null;

                // Format datetime
                var dateobj = new Date();
                var D = dateobj.getDate();
                var M = dateobj.getMonth();
                var Y = dateobj.getFullYear();
                for (var i = 0; i < 5; i++) {
                    var monthNames = [
                        "01", "02", "03",
                        "04", "05", "06", "07",
                        "08", "09", "10",
                        "11", "12"
                    ];
                    if (D < 10) {
                        D = '0' + D
                    }

                    if (M == 3 || M == 5 || M == 8 || M == 10 && D > 30)
                        return D == 1;
                    else if (M == 1) {
                        Boolean(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
                        if (Boolean && D > 29)
                            return D == 1;
                        else if (D > 28)
                            return D == 1;
                    }

                    var dateString = Y + '-' + monthNames[M] + '-' + D;
                    $scope.dayGroup.push(filterFilter($scope.days, { dt_txt: dateString }));
                    D++;
                }
                console.log($scope.dayGroup);

                $scope.dayDetails = $scope.dayGroup[0][0];
                $scope.dayDetails.time = $scope.dayDetails.dt_txt.split(" ")[1];
                $scope.selectedDay = $scope.dayGroup[0];

                $scope.FuncShow($scope.selectedDay, $scope.dayDetails);

                //Get date
                $scope.convertDateTime = function (day) {
                    day.date = day.dt_txt.split(" ")[0];
                }
            });
        }

        $scope.humidChart = function () {
            $scope.currentOption = 2;
            console.log($scope.currentOption)
            $scope.FuncShow($scope.selectedDay, $scope.dayDetails);
        }

        $scope.tempChart = function () {
            $scope.currentOption = 1;
            console.log($scope.currentOption)
            $scope.FuncShow($scope.selectedDay, $scope.dayDetails);
        }


        //Event click show details
        $scope.FuncShow = function (days, currentDay) {
            $scope.timezone = [];
            $scope.temperature = [];
            $scope.humidity = [];

            console.log(currentDay);
            $scope.dayDetails = currentDay;
            $scope.dayDetails.time = $scope.dayDetails.dt_txt.split(" ")[1];
            $scope.selectedDay = days;


            for (const index in $scope.selectedDay) {
                if (index != "$$hashKey") {
                    $scope.selectedDay[index];
                    // times
                    // data
                    $scope.timezone.push($scope.selectedDay[index].dt_txt.split(" ")[1])
                    $scope.temperature.push(Math.round($scope.selectedDay[index].main.temp - 273.5))
                    $scope.humidity.push($scope.selectedDay[index].main.humidity)
                }
            }


            console.log($scope.timezone)
            console.log($scope.temperature)
            console.log($scope.humidity)

            if ($scope.currentOption == 1) {
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
            } else if ($scope.currentOption == 2) {
                var canvas = document.getElementById("myChart");
                var data = {
                    labels: $scope.timezone,
                    datasets: [
                        {
                            label: "Humidity",
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
                            pointRadius: 5,
                            pointHitRadius: 10,
                            data: $scope.humidity,
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
            }
        }


    })
    .directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });