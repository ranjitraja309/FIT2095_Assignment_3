class Driver {
    constructor(driver_name, driver_department, driver_license, driver_isActive) {
        this.driver_id = this.newDriverID();
        this.driver_name = driver_name;
        this.driver_department = driver_department;
        this.driver_license = driver_license;
        this.driver_isActive = driver_isActive;
        this.driver_createdAt = new Date();
    };
// creates driver ID according to requirements
    newDriverID() {
        const randomNumbers = Math.floor(Math.random() * 100).toString();
        const randomLetters = this.newRandomLetters(3);
        return `D${randomNumbers}-30-${randomLetters}`
    };
//Code for random letters (can choose length)
    newRandomLetters(length) {
        let result = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        };
        return result;
    }
}; 

module.exports = Driver; 
