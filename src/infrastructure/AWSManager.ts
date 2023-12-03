import path from 'path';
import AWS from 'aws-sdk';
import fs from 'fs'; import dotenv from 'dotenv'
import { IAWSConfig } from '../interfaces/interfaceAWS';
import { IUser } from '../interfaces/userInterface';
dotenv.config()

export class AWSS3Config implements IAWSConfig {
    private readonly accessKeyId: string;
    private readonly secretAccessKey: string;

    constructor() {
        this.accessKeyId = process.env.accesskeyaws as string;
        this.secretAccessKey = process.env.secretkeyaws as string;
    }

    private configureAWS(): void {
        AWS.config.update({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }

    sendParams(image: IUser['imagem']): any {
        const ext = path.extname(image?.data.originalname);
        const fileContent = fs.readFileSync(image?.data.path);

        const params = {
            Bucket: 'bluefive/easypass/user',
            Key: `${image?.user_CPF}/${image?.tipo}${ext}`,
            Body: fileContent
        };

        return params
    }

    getParams(image: IUser['imagem']): any {
        const params = `https://bluefive.s3.us-west-1.amazonaws.com/easypass/user/${image?.user_CPF}/${image?.tipo}.png` 
        return params
    }

    getS3Instance(): AWS.S3 {
        this.configureAWS();
        console.log('AWS Configurada')
        return new AWS.S3();
    }
}

