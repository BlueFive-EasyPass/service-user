import path from 'path';
import AWS from 'aws-sdk';
import fs from 'fs'; import dotenv from 'dotenv'
import { IS3Config} from '../interfaces/interfaceAWS';
import { IUser } from '../interfaces/userInterface';
dotenv.config()

export class AWSConfig {
    protected readonly accessKeyId: string;
    protected readonly secretAccessKey: string;
    protected readonly regionAWS: string;

    constructor() {
        this.accessKeyId = process.env.accesskeyaws as string;
        this.secretAccessKey = process.env.secretkeyaws as string;
        this.regionAWS = process.env.regionAWS as string
        this.configureAWS(); 
    }

    protected configureAWS(): void {
        AWS.config.update({
            region: this.regionAWS,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }
}

export class AWSS3Config extends AWSConfig implements IS3Config {
    constructor() {
        super();
    }

    sendParams(image: IUser['imagem']): any {
        const ext = path.extname(image?.data.originalname);
        const fileContent = fs.readFileSync(image?.data.path);

        const params = {
            Bucket: 'bluefive/easypass/user',
            Key: `${image?.user_CPF}/${image?.tipo}${ext}`,
            Body: fileContent,
        };

        return params;
    }

    getParams(image: IUser['imagem']): any {
        const params = `https://bluefive.s3.us-west-1.amazonaws.com/easypass/user/${image?.user_CPF}/${image?.tipo}.png`;
        return params;
    }

    getS3Instance(): AWS.S3 {
        this.configureAWS()
        console.log('AWS Configurada');
        return new AWS.S3();
    }
}
