import { PrismaClient } from "@prisma/client";


declare const globalThis : {
     prisma : PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;