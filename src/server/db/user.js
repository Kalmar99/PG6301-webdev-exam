const users = new Map()
let counter = 0;

const createUser = (username,password) => {
    
    const user = {
        id: (counter++),
        username: username,
        password: password,
        coins: 1000
    }
    return users.set(username,user)
}

const getUser = (username) => {
    return users.get(username)
}

const verifyUser = (username,password) => {
    
    const user = getUser(username)

    if(!user) {
        return false;
    } else {
        return user.password === password;
    }

}

module.exports = {createUser,getUser,verifyUser}