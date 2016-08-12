namespace MyApp.Services {


    export class GoLibertyService {


        public arriveToDestination(location, destination)
        {
            var kms = this.getDistanceFromLatLonInKm(location, destination);

            return (kms === 0) ? true : false;
        }

        public getClose(location, destination, previousDistance ) {

            var currentDistance = this.getDistanceFromLatLonInKm(location, destination);

            return (currentDistance < previousDistance) ? true : false;

        }

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


    public deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    }

    angular.module('MyApp').service('goLibertyService' , GoLibertyService);


    export class ChatService {
        // Some fake testing data
        private chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        public all() {
            return this.chats;
        } 

        public remove(chat) {
            this.chats.splice(this.chats.indexOf(chat), 1);
        }

        public get(chatId:number) {
            return this.chats.filter(c => c.id == chatId)[0];
        }

    }

    angular.module('MyApp').service('chatService', ChatService);

}