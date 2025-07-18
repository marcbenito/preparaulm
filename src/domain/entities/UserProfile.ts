export class  UserProfile {
  constructor ( 
    public id: string,
    public email: string,
    public name: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date, 
    public phone?: string,
    public avatarUrl?: string
  ){}
}

export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
} 