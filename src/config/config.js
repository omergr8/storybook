import { Configuration, OpenAIApi } from "openai";

export const s3Config = {
  bucketName: 'umarpolly',
  accessKeyId: process.env.REACT_APP_ACCESS_Key,
  secretAccessKey: process.env.REACT_APP_SECRET_Key,
  region: "us-east-1",
}


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_Key,
  });

  export const openai = new OpenAIApi(configuration);
