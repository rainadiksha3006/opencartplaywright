import { faker } from "@faker-js/faker";

export class  RandomDataUtil{

    static getFirstName(){
       return faker.person.firstName();
    }

    static getLastName(){
       return faker.person.lastName();
    }

    static getFullnName(){
       return faker.person.fullName();
    }

    static getEmail(){
       return faker.internet.email();
    }
     
    static getPhoneNumber(){
       return faker.phone.number();
    }

    static getUsername(){
       return faker.internet.username();
    }

    static getPassword(){
       return faker.internet.password();
    }

    static getRandomCountry(){
       return faker.location.country();
    }

    static getRandomState(){
       return faker.location.state();
    }

    static getRandomCity(){
       return faker.location.city();
    }

    static getRandomPin(){
       return faker.location.zipCode();
    }

    static getRandomAddress(){
       return faker.location.streetAddress();
    }

    static getRandomPassword(length: number =10){
       return faker.internet.password({length});
    }

    static getRandomAlphamumeric(length: number){
       return faker.string.alphanumeric(length);
    }

    static getRandomNumeric(length: number){
       return faker.string.numeric(length);
    }

     static getRandomUUID(){
       return faker.string.uuid();
    }

    
}