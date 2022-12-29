import { v4 as uuidv4 } from "uuid";

export class Session {
  id: string;
  email: string;
  valid: boolean;

  constructor(email: string, id?: string, valid?: boolean) {
    this.id = id ? id : uuidv4();
    this.email = email;
    this.valid = valid ? valid : true;
  }
}
