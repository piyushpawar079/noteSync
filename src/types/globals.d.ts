import { User } from "./custom-types";

declare global {
    interface CustomJwtSessionClaims extends User{
        
    }
}