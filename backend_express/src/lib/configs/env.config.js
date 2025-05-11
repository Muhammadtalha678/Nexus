import "dotenv/config";

export const env_config = {
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
}
