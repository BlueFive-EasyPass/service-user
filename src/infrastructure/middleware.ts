import * as jose from 'jose'
import dotenv from 'dotenv';
dotenv.config();

export class TokenMiddleware {
    static async verifyToken(req: { headers: { [x: string]: any; }; body: { token: any; }; decodedToken: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => any) {
        try {
            let authHeader;

            if (req.headers['authorization']) {
                authHeader = req.headers['authorization'];
            } else {
                return res.status(401).json({ message: 'Sem Token' });
            }

            console.log('Middleware called');
            const alg = 'RS256'
            const spki = `-----BEGIN PUBLIC KEY-----
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwhYOFK2Ocbbpb/zVypi9
            SeKiNUqKQH0zTKN1+6fpCTu6ZalGI82s7XK3tan4dJt90ptUPKD2zvxqTzFNfx4H
            HHsrYCf2+FMLn1VTJfQazA2BvJqAwcpW1bqRUEty8tS/Yv4hRvWfQPcc2Gc3+/fQ
            OOW57zVy+rNoJc744kb30NjQxdGp03J2S3GLQu7oKtSDDPooQHD38PEMNnITf0pj
            +KgDPjymkMGoJlO3aKppsjfbt/AH6GGdRghYRLOUwQU+h+ofWHR3lbYiKtXPn5dN
            24kiHy61e3VAQ9/YAZlwXC/99GGtw/NpghFAuM4P1JDn0DppJldy3PGFC0GfBCZA
            SwIDAQAB
            -----END PUBLIC KEY-----`
            const publicKey = await jose.importSPKI(spki, alg)            
            console.log(authHeader);

            if (authHeader) {
                const { payload, protectedHeader } = await jose.jwtVerify(authHeader, publicKey, {
                    issuer: 'urn:example:issuer',
                    audience: 'urn:example:audience',
                })

                console.log(protectedHeader)
                console.log(payload)
                console.log('Decoded token:', payload);

                req.decodedToken = payload;

                console.log('Passed middleware');
                return next();
            } else {
                return res.status(401).json({ message: 'Token não fornecido' });
            }
        } catch (error) {
            console.log('Erro no middleware:', error);

            if (error) {
                return res.status(401).json({ message: 'Token expirado' });
            } else {
                return res.status(401).json({ message: 'Token inválido' });
            }
        }
    }
}
