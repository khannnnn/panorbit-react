const usersList = (state = [], action) => {
    switch (action.type) {
        case "USERSLIST":
            return action.payload;
        default:
            return state;
    }
}

export default usersList;