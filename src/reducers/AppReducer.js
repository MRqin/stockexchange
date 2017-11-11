const defaultState = {
    title: '',
};

const AppReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'RECIVETITLE':
        return Object.assign({},state, {
            title: action.title,
        });
        default: return state;
    }
};

export default AppReducer;