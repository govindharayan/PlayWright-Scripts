const ProcessENV = process.env.TEST_ENV;
const env = ProcessENV || "dev";

console.log(`Running tests in ${env} environment`);

const config = {
    apiUrl: "https://conduit-api.bondaracademy.com/api",
    userEmail: "harayangovind@gmail.com",
    userPassword: "Govind@11022002"
}

if(env === "dev") {
    config.userEmail = "harayangovind@gmail.com",
    config.userPassword = "Govind@11022002";
} 
 if(env === "qa") {
    config.userEmail = "qauser@gmail.com",
    config.userPassword = "QaUser@123";
}

if(env === "prod") {
    config.userEmail = "produser@gmail.com",
    config.userPassword = "ProdUser@456";
}
export {config}