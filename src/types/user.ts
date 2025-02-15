export interface User {
  userId: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  isProfileComplete: boolean;
  firstName: string;
  lastName: string;
  studentId: string;
  programOfStudy: string;
  interests: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}