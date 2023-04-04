export class LeaveApplication {
    constructor(
      public id: number,
      public userId: number,
      public fromDate: string,
      public toDate: string,
      public leaveReason: string,
      public emergencyContact: string,
      public leaveType: string,
      public filePath: string,
      public applicationStatus: string
    ) {}
  }