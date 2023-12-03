export interface IUser {

    userData?: {
        user_Background?: string;
        user_credit?: string;
        user_FotoRec?: string;
        user_RGTras?: string;
        user_RGFrente?: string;
        user_status?: string;
        user_verifycel?: string;
        user_verifyemail?: string;
        user_CPF: string;
        user_RG?: string;
        user_nome?: string;
        user_email?: string;
        user_senha?: string | Promise<string> | any;
        user_nascimento?: string;
        user_endCEP?: string;
        user_endUF?: string;
        user_endbairro?: string;
        user_endrua?: string;
        user_endnum?: string;
        user_endcomplemento?: string;
        user_endcidade?: string;
        user_tipo?: string;
        list_CPF_list_id?: string;
        user_cel?: string;
        user_idcli?: string;
        user_CPFR?: string;
    }

    imagem?: {
        data?: any,
        user_CPF: string,
        tipo: string
    }

    saveToDatabase(): any
    searchUser(): any
    updateUser(arg0: any): any
    loginSystem(): any
    cancelUser(): any
    activateUser(): any
    sendImage(): any
    getImage(): any
}

