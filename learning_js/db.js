let users_db =[
    {id: 1, name: 'Andrew', age: 32}
]

function getUsers() {
    return users_db;
}

function createUser(name, age) {
    const lastId =users_db[users_db.length - 1].id;
    const newUser = {
        id: lastId + 1,
        name: name,
        age: age,
    }
    users_db.push(newUser)

    return newUser;
}

function deleteUser(id) {
    const users = users_db.filter(x => x.id !== id);
    users_db = users;

    return "sucess"
}

export {
    users_db,
    getUsers,
    createUser,
    deleteUser
}