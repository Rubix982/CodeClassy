class GetAnnouncementDTOComment {
  private readonly fullName: string;
  private readonly contentBody: string;
  private readonly creationDate: string;
}

export class GetAnnouncementDTO {
  private readonly ID: string;
  private readonly creationDate: string;
  private readonly teacherFullName: string;
  private readonly contentBody: string;
  private readonly comments: GetAnnouncementDTOComment[] = [];

  constructor(__announcementData) {
    this.ID = __announcementData.ID;
    this.creationDate = __announcementData.creationDate;
    this.teacherFullName = __announcementData.teacherFullName;
    this.contentBody = __announcementData.contentBody;

    if (__announcementData.comments) {
      this.comments = __announcementData.comments;
    }
  }
}
