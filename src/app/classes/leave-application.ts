
export class LeaveApplication {
    constructor(
      public id: number|string,
      public userId: number,
      public userName: string,
      public fromDate: string|null|Date,
      public toDate: string|null|Date,
      public leaveReason: string,
      public emergencyContact: string,
      public leaveType: string,
      public filePath: string,
      public applicationStatus: string,
      public attachment: File,
      public isFileUpdated: boolean
    ) {}
  }