import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const NotFoundErrCode = "P2025";
export function getErrorMessage(errorCode : string): string{
    if (errorCode === "P2002"){
        return "Given non unique value"
    }else if (errorCode === "P2003"){
        return 'Field is not found'
    }else if (errorCode === "P2007"){
        return 'Data validation error'
    }else if (errorCode === "P2014"){
        return 'Error in relations'
    }
    return "Error code is undefined " + errorCode
    
}
