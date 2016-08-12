namespace MyApp.Controllers {

    export class DashController {
    }

    export class ChatsController {
        public chats;

        public remove(chat) {
            this.chatService.remove(chat);
        }

        constructor(private chatService: MyApp.Services.ChatService) {
            this.chats = chatService.all();
        }
    }


    export class ChatDetailController {
        public chat;

        constructor(private chatService: MyApp.Services.ChatService, $stateParams: ng.ui.IStateParamsService) {
            console.log('chat id==');
            console.log($stateParams['chatId']);
            this.chat = chatService.get(+$stateParams['chatId']);
        }
    }



    export class AccountController {
        public settings = {
            enableFriends: true
        }
    }

    export class GoLibertyController {
        private options = {
            timeout: 10000,
            enableHighAccuracy: false
        }
        public lat;
        public long;
        public watchLat;
        public watchLong;


        public watchDistance;

        public lastLocation;

        public lastDistance;
        public currentDistance;

        private destination;

        private _goLibertyService;


        constructor(private $cordovaGeolocation: ngCordova.IGeolocationService,
            private goLibertyService: MyApp.Services.GoLibertyService) {

            this.destination = { latitude: 40.689249, longitude: -74.044500 }; //Statue of Liberty Location
            this.lastDistance = 6371; //Radious of the earth in Kms

        }

        public getCurrentLocation() {
            this.$cordovaGeolocation.getCurrentPosition(this.options)
                .then((location) => {
                    this.lat = location.coords.latitude;
                    this.long = location.coords.longitude;
                }, (error) => {
                    console.log(error);
                });
        }

        public watchLocation() {
            let watch = this.$cordovaGeolocation.watchPosition(this.options);
            watch.then(null, (error) => {
                console.log(error);
            }, (location) => {
                this.watchLat = location.coords.latitude;
                this.watchLong = location.coords.longitude;


                this.locationEvaluation(location);

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

        }

        public locationEvaluation(location) {

            this.currentDistance = this.goLibertyService.getDistanceFromLatLonInKm(location.coords,
                this.destination);
            console.log("Distance before" + this.lastDistance);
            console.log("Distance Now" + this.currentDistance);

            if (this.currentDistance < 0.0005000000000) {
                console.log("Arrive");
                navigator.notification.confirm("You Are Very Welcome!!!, today " + Date(), () => { }, "Statue of Liberty say", ["OK"]);

            } else if (this.currentDistance < this.lastDistance) {
                console.log("Hot Hot");
                navigator.vibrate([1000, 1000, 2000, 1000]);
                navigator.notification.beep(3);

            } else {
                console.log("Cold Cold");
                navigator.notification.beep(1);

            }

            this.lastDistance = this.currentDistance;

        }
    }
}
