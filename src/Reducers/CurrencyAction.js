const currencyList = (state = [], action) => {
    switch (action.type) {
        case "CURRENCYLIST":
            return action.payload;
        default:
            return state;
    }
}

export default currencyList;