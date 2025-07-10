import contentReducer from "./content-slice";
import dialogsReducer from "./dialogs-slice";
import sitebarReducer from "./sitebar-slice";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi how are you?', likesCount: 45},
                {id: 2, message: "I'm fine thank you", likesCount: 49}
            ],
            newPostText: "input text!"
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Dmitriy'},
                {id: 2, name: 'Taras'},
                {id: 3, name: 'Oleg'},
                {id: 4, name: 'Roman'},
                {id: 5, name: 'Volodumur'},
                {id: 6, name: 'Vadim'}
            ],
            messages: [
                {id: 1, message: 'sbdbzb'},
                {id: 2, message: 'fngmchg'},
                {id: 3, message: 'trjymbh nbv'},
                {id: 4, message: 'srtjtat'},
                {id: 5, message: 'uihpoifgb'},
                {id: 6, message: 'w3esergrh'}
            ],
            newMessageText: "input text!"
        },
        sitebar: {
            friends: [
                {name: "Dimon", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbkECXtEG_6-RV7CSNgNoYUGZE-JCliYm9g&s"},
                {name: "Sava", imageUrl: "https://images.unsplash.com/photo-1628563694622-5a76957fd09c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"},
                {name: "Vasia", imageUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"}
            ]
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber(state) {
        this.rerenderEntireTree(state);
        console.log('rerender done!')
    },
    rerenderEntireTree() {
        console.log("fuck you!");
    },
    subscribe(observer) {
        this.rerenderEntireTree = observer;
    },
    dispatch(action) {

        this._state.profilePage = contentReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sitebar = sitebarReducer(this._state.sitebar, action);

        // this.rerenderEntireTree(this._state);
        this._callSubscriber(this._state);
    }
}

export default store;