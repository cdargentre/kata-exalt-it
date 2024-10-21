class Place {
    constructor(address, phone_number, requiredPassLevel, requiredAgeLevel) {
      this.address = address; 
      this.phone_number = phone_number; 
      this.requiredPassLevel = requiredPassLevel; 
      this.requiredAgeLevel = requiredAgeLevel;
    }
  }
  
  module.exports = Place;