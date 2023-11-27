export interface IUser {
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
    user_senha: string | Promise<string>; 
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
}

