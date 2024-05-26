import {deleteUser, getUsers, createUser, users_db} from "./db.js";

console.log(getUsers());
const result = createUser("Johny", 25);
console.log(result)
console.log(getUsers())
console.log(deleteUser(1))
console.log(users_db)