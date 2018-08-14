var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(path.join(__dirname, 'public')));


//Tạo port để lắng nghe request từ client gọi lên.
app.listen(3000, function () {
    console.log('Node-server running...')
});

var cityArray = [
    { fullName: 'Hanoi, Vn', cityCode: 'Hanoi', countryCode: "VN" },
    { fullName: 'Kabul, Afghanistan', cityCode: 'Kabul', countryCode: "AF" },
    { fullName: 'Minsk, Belarus', cityCode: 'Minsk', countryCode: "BY" },
    { fullName: 'Beijing, China', cityCode: 'Beijing', countryCode: "CN" },
    { fullName: 'Quito, Ecuador', cityCode: 'Quito', countryCode: "EC" }
];

app.get('/', function (request, response) {
    request.redirect('index.html');
});

app.get('/cityCapital', function (request, response) {
    response.send(cityArray);
});

