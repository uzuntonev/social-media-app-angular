export interface IFile {
    key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt?: Date;
}

export class Upload {
    key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date()
    constructor(file: File) {
        this.file = file
    }
}