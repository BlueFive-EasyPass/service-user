import { IMidUser } from "../interfaces/interfacemiduser";
import { IUser } from "../interfaces/userinterface";
import bcrypt from 'bcrypt'

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

    async compareHash(hash: string): Promise<boolean> {

        const match = await bcrypt.compare(this.userData.user_senha, hash)

        return match
    }

}