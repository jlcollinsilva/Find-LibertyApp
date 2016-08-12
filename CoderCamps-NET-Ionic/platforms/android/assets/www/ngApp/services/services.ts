namespace MyApp.Services {

    export class GoLibertyService {      

 
        // this formula was taken from: http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
        // and make a little change...thanks
        public getDistanceFromLatLonInKm(location1, location2) {

                var R = 6371; // Radius of the earth in km
                var dLat = this.deg2rad(location2.latitude - location1.latitude);  // deg2rad below
                var dLon = this.deg2rad(location2.longitude - location1.longitude);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(this.deg2rad(location1.latitude)) * Math.cos(this.deg2rad(location2.latitude)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);

                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                return d;
    }

   // this formula was taken from: http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    public deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    public getWinSignal() {
        this.doBeep(5);
        navigator.notification.confirm("You Are Very Welcome!!!, today " + Date(), () => { }, "Statue of Liberty says", ["OK"]);
    }

     public getHotSignal() {
         this.doVibrate(1000);
         this.doBeep(1);
     }

     public getWarmSignal() {
         this.doBeep(1);
     }

     public getColdSignal() {
         this.doVibrate([1000, 1000, 1000, 1000, 1000]);
         this.doBeep(3);
     }

     public doVibrate(times) {
         navigator.vibrate(times);
     }

     public doBeep(times) {
         navigator.notification.beep(times);
     }

    }

    angular.module('MyApp').service('goLibertyService' , GoLibertyService);

}