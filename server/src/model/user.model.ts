import argo2 from "argon2";
import log from "../utils/logger";
import { CreateUserInput } from "../schema/user.schema";
import { v4 as uuid } from "uuid";

export const privateFields = ["password"];

export class User {
  id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";

  constructor(
    name: string,
    surname: string,
    email: string,
    password: string,
    dateOfBirth: string,
    gender: "male" | "female" | "other",
    id?: string
  ) {
    // const { name, surname, email, password, dateOfBirth, gender } = input;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    if (id) this.id = id;
  }

  async hashPassword(): Promise<User> {
    const hashedPassword = await argo2.hash(this.password);
    return new User(
      this.name,
      this.surname,
      this.email,
      hashedPassword,
      this.dateOfBirth,
      this.gender,
      uuid()
    );
  }

  // static async build(input: CreateUserInput): Promise<UserHashed> {
  //   const { password } = input;
  //   const hashedPassword = await argo2.hash(password);
  //   return new UserHashed({
  //     ...input,
  //     password: hashedPassword,
  //   });
  // }

  async validatePassword(password: string): Promise<boolean> {
    try {
      return await argo2.verify(this.password, password);
    } catch (error) {
      log.error(error, "Could not validate password");
      return false;
    }
  }
}

// export class UserHashed extends User {
//   id: string;

//   constructor(input: CreateUserInput) {
//     super(input);
//     this.id = uuid();
//   }
// }
