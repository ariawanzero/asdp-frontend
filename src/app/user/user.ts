export class UserFilter {
    username: string;
    name: string;
    jabatan: string;
    divisi: string;
    userRole: string;
    status: string;
    page: number;

    constructor() {
        this.username = "";
        this.name = "";
        this.jabatan = "";
        this.divisi = "";
        this.userRole = "";
        this.status = "";
        this.page = 0;
    }
}

export class User {
    id: string;
    username: string;
    userRoleName: string;
    name: string;
    noHp: string;
    alamat: string;
    position: string;
    status: string;
}

export class UserDetail {
    id: string;
    username: string;
    userRoleId: string;
    name: string;
    noHp: string;
    alamat: string;
    jabatan: string;
    divisi: string;
    unit: string;
    expiredDate: number;
}

export class UserHistoryFilter {
    startDate: string;
    endDate: string;
    page: number;

    constructor() {
        this.startDate = "";
        this.endDate = "";
        this.page = 0;
    }
}

export class UserHistory {
    username: string;
    divisi: string;
    dateLoginDisplay: string;
    dateLogin: number;
}