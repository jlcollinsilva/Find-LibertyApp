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
        var ChatsController = (function () {
            function ChatsController(chatService) {
                this.chatService = chatService;
                this.chats = chatService.all();
            }
            ChatsController.prototype.remove = function (chat) {
                this.chatService.remove(chat);
            };
            return ChatsController;
        }());
        Controllers.ChatsController = ChatsController;
        var ChatDetailController = (function () {
            function ChatDetailController(chatService, $stateParams) {
                this.chatService = chatService;
                console.log('chat id==');
                console.log($stateParams['chatId']);
                this.chat = chatService.get(+$stateParams['chatId']);
            }
            return ChatDetailController;
        }());
        Controllers.ChatDetailController = ChatDetailController;
        var AccountController = (function () {
            function AccountController() {
                this.settings = {
                    enableFriends: true
                };
            }
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
        var GoLibertyController = (function () {
            function GoLibertyController($cordovaGeolocation, goLibertyService) {
                this.$cordovaGeolocation = $cordovaGeolocation;
                this.goLibertyService = goLibertyService;
                this.options = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                this.destination = { latitude: 40.689249, longitude: -74.044500 }; //Statue of Liberty Location
                this.lastDistance = 6371; //Radious of the earth in Kms
            }
            GoLibertyController.prototype.getCurrentLocation = function () {
                var _this = this;
                this.$cordovaGeolocation.getCurrentPosition(this.options)
                    .then(function (location) {
                    _this.lat = location.coords.latitude;
                    _this.long = location.coords.longitude;
                }, function (error) {
                    console.log(error);
                });
            };
            GoLibertyController.prototype.watchLocation = function () {
                var _this = this;
                var watch = this.$cordovaGeolocation.watchPosition(this.options);
                watch.then(null, function (error) {
                    console.log(error);
                }, function (location) {
                    _this.watchLat = location.coords.latitude;
                    _this.watchLong = location.coords.longitude;
                    _this.locationEvaluation(location);
                    /* this.currentDistance = this.goLibertyService.getDistanceFromLatLonInKm(location.coords,
                                                                                            this.destination);
                     console.log("Distance before" + this.lastDistance);
                     console.log("Distance Now" + this.currentDistance);
     
                     if (this.currentDistance < 1)
                     {
                         console.log("Arrive");
                     } else if (this.currentDistance < this.lastDistance)
                     {
                         console.log("Hot Hot");
                         navigator.vibrate([1000, 1000, 2000, 1000]);
                         navigator.notification.beep(3);
     
                     } else
                     {
                         console.log("Cold Cold");
                         navigator.notification.beep(1);
                         navigator.notification.confirm("You Are Very Welcome!!!, today " + Date(), () => { },"Statue of Liberty say",["OK"]);
                     }
     
                     this.lastDistance = this.currentDistance;
                     */
                });
            };
            GoLibertyController.prototype.locationEvaluation = function (location) {
                this.currentDistance = this.goLibertyService.getDistanceFromLatLonInKm(location.coords, this.destination);
                console.log("Distance before" + this.lastDistance);
                console.log("Distance Now" + this.currentDistance);
                if (this.currentDistance < 0.0005000000000) {
                    console.log("Arrive");
                    navigator.notification.confirm("You Are Very Welcome!!!, today " + Date(), function () { }, "Statue of Liberty say", ["OK"]);
                }
                else if (this.currentDistance < this.lastDistance) {
                    console.log("Hot Hot");
                    navigator.vibrate([1000, 1000, 2000, 1000]);
                    navigator.notification.beep(3);
                }
                else {
                    console.log("Cold Cold");
                    navigator.notification.beep(1);
                }
                this.lastDistance = this.currentDistance;
            };
            return GoLibertyController;
        }());
        Controllers.GoLibertyController = GoLibertyController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=controllers.js.map