import {User} from "../models/User";

export class UserService {

    public async create(user: User): User {
        return user;
    }
}