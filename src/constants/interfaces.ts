import { Request } from 'express';

export interface RequestWithAuth extends Request {
    email: string;
    sub: string;
}

export interface LoginRequest extends Request {
    isFollowedLogin?: boolean;
}

// export interface RequestWithMulter extends Request {
//     file: {
//         fieldname: string; // The name of the field in the form ('file' in the example)
//         originalname: string; // The name of the uploaded file (as on the client)
//         encoding: string; // The encoding type (usually '7bit' or 'base64')
//         mimetype: string; // The MIME type of the uploaded file (e.g., 'image/jpeg', 'application/pdf')
//         buffer: Buffer; // The file data as a Buffer (this is where the file is stored in memory with memory storage)
//         size: number; // The size of the file in bytes
//     };
// }
