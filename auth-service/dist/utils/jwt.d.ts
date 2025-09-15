import { JwtPayload, TokenPair } from '../types/auth';
export declare const generateTokens: (payload: {
    id: number;
    email: string;
    role: string;
}) => TokenPair;
export declare const verifyAccessToken: (token: string) => JwtPayload | null;
export declare const verifyRefreshToken: (token: string) => JwtPayload | null;
export declare const decodeToken: (token: string) => JwtPayload | null;
//# sourceMappingURL=jwt.d.ts.map