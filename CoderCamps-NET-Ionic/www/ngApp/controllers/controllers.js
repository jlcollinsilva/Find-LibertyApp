var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DashController = (function () {
            function DashController() {
            }
            return DashController;
        }());
        Controllers.DashController = DashController;
        var GoLibertyController = (function () {
            function GoLibertyController($cordovaGeolocation, goLibertyService) {
                this.$cordovaGeolocation = $cordovaGeolocation;
                this.goLibertyService = goLibertyService;
                //Options initialization for watchPosition
                this.options = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                this.destination = { latitude: 40.689249, longitude: -74.044500 }; //Statue of Liberty Location
                this.lastDistance = 6371; //Radious of the earth in Kms
                this.playShow = true;
            }
            GoLibertyController.prototype.watchLocation = function () {
                var _this = this;
                this.playShow = false;
                var watch = this.$cordovaGeolocation.watchPosition(this.options);
                console.log(watch);
                watch.then(null, function (error) {
                    console.log(error);
                }, function (location) {
                    _this.watchLat = location.coords.latitude;
                    _this.watchLong = location.coords.longitude;
                    console.log(watch['watchID']);
                    _this.watchID = watch['watchID'];
                    //depend of the user location a signal or notification will be send
                    var result = _this.locationEvaluation(location);
                    if (result === "STOP") {
                        _this.stopWatching();
                        _this.playShow = true; //To play again?
                    }
                });
            };
            GoLibertyController.prototype.stopWatching = function () {
                this.$cordovaGeolocation.clearWatch(this.watchID);
            };
            GoLibertyController.prototype.locationEvaluation = function (location) {
                var result = "CONTINUE";
                this.currentDistance = this.goLibertyService.getDistanceFromLatLonInKm(location.coords, this.destination);
                console.log("Distance before" + this.lastDistance);
                console.log("Distance Now" + this.currentDistance);
                //Less than 100 meters close is Ok for this version of the game
                if (this.currentDistance < 0.1000000000000) {
                    console.log("Arrive");
                    this.winSignal();
                    result = "STOP";
                }
                else if (this.currentDistance < this.lastDistance) {
                    if (this.currentDistance < 1) {
                        console.log("Hot Hot");
                        this.hotSignal();
                    }
                    else {
                        console.log("Warn Warn");
                        this.warmSignal();
                    }
                }
                else if (this.currentDistance === this.lastDistance) {
                    console.log("Taking a break?");
                    navigator.notification.confirm("Are you taking a break?", function () { }, "Go Liberty says", ["OK"]);
                }
                else {
                    console.log("Cold Cold");
                    this.coldSignal();
                }
                this.lastDistance = this.currentDistance;
                return result;
            };
            GoLibertyController.prototype.winSignal = function () {
                this.goLibertyService.getWinSignal();
            };
            GoLibertyController.prototype.hotSignal = function () {
                this.goLibertyService.getHotSignal();
            };
            GoLibertyController.prototype.warmSignal = function () {
                this.goLibertyService.getWarmSignal();
            };
            GoLibertyController.prototype.coldSignal = function () {
                this.goLibertyService.getColdSignal();
            };
            return GoLibertyController;
        }());
        Controllers.GoLibertyController = GoLibertyController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=controllers.js.map