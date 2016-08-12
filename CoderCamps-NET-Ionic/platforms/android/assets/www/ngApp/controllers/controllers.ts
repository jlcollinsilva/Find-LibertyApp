namespace MyApp.Controllers {

    export class DashController {
    }

    export class GoLibertyController {
        //Options initialization for watchPosition
        private options = {
            timeout: 10000,
            enableHighAccuracy: false
        } 
        
        public watchLat;
        public watchLong;
        public watchID;
        public playShow;  //Boolean to show or not the Play button to the user.

        public lastDistance;
        public currentDistance;

        private destination;

        constructor(private $cordovaGeolocation: ngCordova.IGeolocationService,
            private goLibertyService: MyApp.Services.GoLibertyService) {

            this.destination = { latitude: 40.689249, longitude: -74.044500 }; //Statue of Liberty Location
            this.lastDistance = 6371; //Radious of the earth in Kms
            this.playShow = true;           
        }

        public watchLocation() {

            this.playShow = false;
            let watch = this.$cordovaGeolocation.watchPosition(this.options);
           
            console.log(watch);

            watch.then(null, (error) => {
                     console.log(error);
                }, (location) => {
                
                this.watchLat = location.coords.latitude;
                this.watchLong = location.coords.longitude;

                console.log(watch['watchID']);

                this.watchID = watch['watchID'];

                //depend of the user location a signal or notification will be send
                let result = this.locationEvaluation(location);

                if (result === "STOP") {
                    this.stopWatching();
                    this.playShow = true;   //To play again?
                }
            
             });
        }


        public stopWatching() {
            this.$cordovaGeolocation.clearWatch(this.watchID);
        }

        public locationEvaluation(location) {

            var result = "CONTINUE";

            this.currentDistance = this.goLibertyService.getDistanceFromLatLonInKm(location.coords,
                                                                                this.destination);
            console.log("Distance before" + this.lastDistance);
            console.log("Distance Now" + this.currentDistance);

            //Less than 100 meters close is Ok for this version of the game
            if (this.currentDistance < 0.1000000000000) {
                console.log("Arrive");
                this.winSignal();
                result = "STOP";

            } else if (this.currentDistance < this.lastDistance) {

                if (this.currentDistance < 1) { //Less than 1 Km is pretty hot
                    console.log("Hot Hot");
                    this.hotSignal();
                    
                } else {
                    console.log("Warn Warn");
                    this.warmSignal();
                }

            } else if (this.currentDistance === this.lastDistance) {
                console.log("Taking a break?");
                navigator.notification.confirm("Are you taking a break?", () => { }, "Go Liberty says", ["OK"]);

            } else {
                console.log("Cold Cold");
                this.coldSignal();

            }

            this.lastDistance = this.currentDistance;

            return result;
        }

        public winSignal() {
            this.goLibertyService.getWinSignal();
        }

        public hotSignal() {
            this.goLibertyService.getHotSignal();
        }

        public warmSignal() {
            this.goLibertyService.getWarmSignal();
        }

        public coldSignal() {
            this.goLibertyService.getColdSignal();
        }
    }
}