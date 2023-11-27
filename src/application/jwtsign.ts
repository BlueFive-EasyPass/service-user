import * as JWT from 'jose'
import dotenv from 'dotenv'
dotenv.config()

export class JWTSign {
    static async signExecute() {
        const secret = new TextEncoder().encode(
            'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
          )
          const alg = 'HS256'
          
          const jwt = await new JWT.SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(secret)
          

        return jwt
    }
}