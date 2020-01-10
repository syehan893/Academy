export default class Rent{
    constructor(id,startTime,endTime,price,fromLocation,toLocation,user,bike,stand){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.user = user;
        this.bike = bike;
        this.stand = stand;
    }
}