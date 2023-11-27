import { IDatabaseConnection } from "../adapters/databaseinterface";
import { IUser } from "../adapters/userinterface";

export class User implements IUser {

    user_Background?: string | undefined;
    user_credit?: string | undefined;
    user_FotoRec?: string | undefined;
    user_RGTras?: string | undefined;
    user_RGFrente?: string | undefined;
    user_status?: string | undefined;
    user_verifycel?: number | undefined;
    user_verifyemail?: number | undefined;
    user_CPF: string;
    user_RG?: string | undefined;
    user_nome?: string | undefined;
    user_email?: string | undefined;
    user_senha: string;
    user_nascimento?: string | undefined;
    user_endCEP?: string | undefined;
    user_endUF?: string | undefined;
    user_endbairro?: string | undefined;
    user_endrua?: string | undefined;
    user_endnum?: number | undefined;
    user_endcomplemento?: string | undefined;
    user_endcidade?: string | undefined;
    user_tipo?: string | undefined;
    list_CPF_list_id?: string | undefined;
    user_cel?: string | undefined;
    user_idcli?: string | undefined;
    user_CPFR?: string | undefined;

    static SaveToDatabase: any;

    [x: string]: any;

    constructor(
        user_CPF: any | undefined,
        user_RG: any | undefined,
        user_email: any | undefined,
        user_senha: any | undefined,
        user_nascimento: any | undefined,
        user_cel: any | undefined,
        user_CPFR: any | undefined,
        user_endCEP: any | undefined,
        user_endcidade: any | undefined,
        user_endbairro: any | undefined,
        user_endrua: any | undefined,
        user_endnum: any | undefined,
        user_endcomplemento: any | undefined,
        user_endUF: any
    ) {
        this.user_CPF = user_CPF;
        this.user_RG = user_RG;
        this.user_email = user_email;
        this.user_senha = user_senha;
        this.user_nascimento = user_nascimento;
        this.user_cel = user_cel;
        this.user_CPFR = user_CPFR;
        this.user_endCEP = user_endCEP;
        this.user_endcidade = user_endcidade;
        this.user_endbairro = user_endbairro;
        this.user_endrua = user_endrua;
        this.user_endnum = user_endnum;
        this.user_endcomplemento = user_endcomplemento;
        this.user_endUF = user_endUF;
    }
}