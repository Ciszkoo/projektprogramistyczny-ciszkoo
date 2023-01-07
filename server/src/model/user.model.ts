import argo2 from "argon2";
import log from "../utils/logger";
import { CreateUserInput } from "../schema/user.schema";
import { v4 as uuid } from "uuid";

export const privateFields = ["password"];

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dateOfBirth: string,
    gender: "male" | "female" | "other",
    id?: string
  ) {
    // const { name, surname, email, password, dateOfBirth, gender } = input;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    if (id) this.id = id;
  }

  async hashPassword(): Promise<User> {
    const hashedPassword = await argo2.hash(this.password);
    return new User(
      this.firstName,
      this.lastName,
      this.email,
      hashedPassword,
      this.dateOfBirth,
      this.gender,
      uuid()
    );
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      return await argo2.verify(this.password, password);
    } catch (error) {
      log.error(error, "Could not validate password");
      return false;
    }
  }
}
