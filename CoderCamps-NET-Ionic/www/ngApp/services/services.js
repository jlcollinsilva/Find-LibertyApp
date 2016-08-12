var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var GoLibertyService = (function () {
            function GoLibertyService() {
            }
            // this formula was taken from: http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
            // and make a little change...thanks
            GoLibertyService.prototype.getDistanceFromLatLonInKm = function (location1, location2) {
                var R = 6371; // Radius of the earth in km
                var dLat = this.deg2rad(location2.latitude - location1.latitude); // deg2rad below
                var dLon = this.deg2rad(location2.longitude - location1.longitude);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(this.deg2rad(location1.latitude)) * Math.cos(this.deg2rad(location2.latitude)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                return d;
            };
            // this formula was taken from: http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
            GoLibertyService.prototype.deg2rad = function (deg) {
                return deg * (Math.PI / 180);
            };
            GoLibertyService.prototype.getWinSignal = function () {
                this.doBeep(5);
                navigator.notification.confirm("You Are Very Welcome!!!, today " + Date(), function () { }, "Statue of Liberty says", ["OK"]);
            };
            GoLibertyService.prototype.getHotSignal = function () {
                this.doVibrate(1000);
                this.doBeep(1);
            };
            GoLibertyService.prototype.getWarmSignal = function () {
                this.doBeep(1);
            };
            GoLibertyService.prototype.getColdSignal = function () {
                this.doVibrate([1000, 1000, 1000, 1000, 1000]);
                this.doBeep(3);
            };
            GoLibertyService.prototype.doVibrate = function (times) {
                navigator.vibrate(times);
            };
            GoLibertyService.prototype.doBeep = function (times) {
                navigator.notification.beep(times);
            };
            return GoLibertyService;
        }());
        Services.GoLibertyService = GoLibertyService;
        angular.module('MyApp').service('goLibertyService', GoLibertyService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=services.js.map