import "dotenv/config";

export const env_config = {
    port:process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    Email_HOST : process.env.EMAIL_HOST,
    EMAIL_PORT : process.env.EMAIL_PORT,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS
}
