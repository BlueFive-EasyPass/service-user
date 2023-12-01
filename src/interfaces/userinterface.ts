export interface IUser {

    userData?: {
        user_Background?: string | undefined;
        user_credit?: string | undefined;
        user_FotoRec?: string | undefined;
        user_RGTras?: string | undefined;
        user_RGFrente?: string | undefined;
        user_status?: string | undefined;
        user_verifycel?: string | undefined;
        user_verifyemail?: string | undefined;
        user_CPF: string;
        user_RG?: string | undefined;
        user_nome?: string | undefined;
        user_email?: string | undefined;
        user_senha: string | Promise<string> | any;
        user_nascimento?: string | undefined;
        user_endCEP?: string | undefined;
        user_endUF?: string | undefined;
        user_endbairro?: string | undefined;
        user_endrua?: string | undefined;
        user_endnum?: string | undefined;
        user_endcomplemento?: string | undefined;
        user_endcidade?: string | undefined;
        user_tipo?: string | undefined;
        list_CPF_list_id?: string | undefined;
        user_cel?: string | undefined;
        user_idcli?: string | undefined;
        user_CPFR?: string | undefined;
    }
    saveToDatabase(): any
    searchUser(): any
    updateUser(arg0: any): any
    loginSystem(): any
}

