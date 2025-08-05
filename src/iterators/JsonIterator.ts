import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class JsonIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const fileContent = readFileSync(filePath, "utf-8");
    this.users = JSON.parse(fileContent);
  }

  [Symbol.iterator](): Iterator<UserData> {
    let index = 0;
    const users = this.users;

    return {
      next(): IteratorResult<UserData> {
        if (index < users.length) {
          return { value: users[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}
