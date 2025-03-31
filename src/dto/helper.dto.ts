export type FileDTO = {    
    fieldName: string;
    encoding: string;
    mimeType: string;
    fileName: string;
    size: string;
    buffer: Buffer;
}

export type Role = {
    name?: 'admin' | 'guide' | 'tourist';
}

export type Identification = {
    file?: string | FileDTO;
    type?: string;
}

export type ResponseDTO = {
    status: string;
    code: string | number;
    message: string;
    data: string[] | object[] | string | object | null;
}