export const currencyList = (data) => {
    return {
        type: "CURRENCYLIST",
        payload: data
    }
}

export const usersList = (data) => {
    return {
        type: "USERSLIST",
        payload: data
    }
}