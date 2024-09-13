//Represents a package
class Package {
    constructor(packages_title, packages_weight, packages_destination, packages_description, packages_isAllocated, driver_id) {
        this.packages_id = this.newPackageID();
        this.packages_title = packages_title;
        this.packages_weight = packages_weight;
        this.packages_destination = packages_destination;
        this.packages_description = packages_description;
        this.packages_createdAt = new Date();
        this.packages_isAllocated = packages_isAllocated;
        this.driver_id = driver_id;
    }
// Creates package ID according to requirements
    newPackageID() {
        const randomNumbers = Math.floor(Math.random() * 100).toString();
        const randomLetters = this.newRandomLetters(2);
        return `P${randomLetters}-RB-${randomNumbers}`
    };
// Code for random letters (can choose length)
    newRandomLetters(length) {
        let result = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        };
        return result;
    };
};

module.exports = Package; 