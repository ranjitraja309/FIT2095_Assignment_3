class Package {
    constructor(package_title, package_weight, package_destination, description, isAllocated, driver_id) {
        this.package_id = this.newPackageID();
        this.package_title = this.package_title;
        this.package_weight = this.package_weight;
        this.package_destination = this.package_destination;
        this.package_description = description;
        this.package_createdAt = new Date();
        this.package_isAllocated = isAllocated;
        this.driver_id = driver_id;
    }
// Creates package ID according to requirements
    newPackageID() {
        const randomNumbers = Math.floor(Math.random() * 100).toString();
        const randomLetters = this.newRandomLetters(3);
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