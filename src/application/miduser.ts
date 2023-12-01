import { IMidUser } from "../interfaces/interfacemiduser";
import { IUser } from "../interfaces/userinterface";
import bcrypt from 'bcrypt'
import * as JWT from 'jose'
import dotenv from 'dotenv'
dotenv.config()

export class MidUser implements IMidUser {
    private userData: any;

    constructor(userData: IUser){
        this.userData = userData
    }

    validateCompleteUser(): boolean {
        console.log(this.userData)

        const excludedFields: string[] = [
            'user_CPFR',
            'user_Background',
            'user_credit',
            'user_FotoRec',
            'user_RGTras',
            'user_RGFrente',
            'user_status',
            'user_verifycel',
            'user_verifyemail'
        ];

        const allRequiredFieldsPresent = Object.keys(this.userData)
            .filter(field => !excludedFields.includes(field))
            .every(field => this.userData[field] !== undefined);

            console.log(allRequiredFieldsPresent);


        return allRequiredFieldsPresent;
    }

    validateLoginCredentials(): boolean {
        return (
            'user_CPF' in this.userData &&
            'user_senha' in this.userData &&
            typeof this.userData.user_CPF === 'string' &&
            typeof this.userData.user_senha === 'string'
        );
    }

    async createHash(): Promise<any> {
        const hash = await bcrypt.hash(this.userData.user_senha, 10);

        return hash
    }

    async compareHash(hash: any): Promise<boolean> {
        console.log(hash)
        console.log('teste1');
    
        const match = await bcrypt.compare(this.userData.userData.user_senha, hash)
        console.log('teste1');
        console.log('match', match)

        if (match) {
            return true
        } else {
            return false
        }
    }

    async createToken(): Promise<string> {
        const secret = new TextEncoder().encode(
            'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
          )
          const alg = 'HS256'
          
          const jwt: string = await new JWT.SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('7d')
            .sign(secret)
          

        return jwt
    }

}