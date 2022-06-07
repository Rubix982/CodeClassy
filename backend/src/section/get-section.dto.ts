class GetSectionDTOAnnouncement {
  ID: string;
  contentBody: string;
  creationDate: string;
}

export class GetSectionDTO {
  readonly ID: string;
  readonly sectionName: string;
  readonly classroomName: string;
  readonly teacherFullName: string;
  readonly students: { email: string; fullName: string }[] = [];
  readonly announcements: GetSectionDTOAnnouncement[] = [];

  constructor(__sectionData) {
    this.ID = __sectionData.sectionID;
    this.sectionName = __sectionData.sectionName;
    this.classroomName = __sectionData.classroomName;
    this.teacherFullName = __sectionData.teacherFullName;

    if (__sectionData.students) {
      this.students = __sectionData.students;
    }

    if (__sectionData.announcements) {
      this.announcements = __sectionData.announcements.sort(
        (
          firstElement: GetSectionDTOAnnouncement,
          secondElement: GetSectionDTOAnnouncement,
        ) => {
          return (
            new Date(secondElement.creationDate) >
            new Date(firstElement.creationDate)
          );
        },
      );
    }
  }
}
