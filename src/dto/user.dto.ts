import { UserRoleType } from "src/enums/user.enum";

export class CreateUserDto {
   id: number
   userName: string;
   emailId: string;
   address: string;
   password: string;
   userRoleType: UserRoleType
}