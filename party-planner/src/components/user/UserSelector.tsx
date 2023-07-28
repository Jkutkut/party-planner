import { useState } from "react";
import Session from "../../model/session/Session";
import UserModel from "../../model/user/UserModel";

interface Props {
    session: Session;
    userIdx: number;
    setUserIdx: (user: number) => void;
};

const UserSelector = ({session, userIdx, setUserIdx}: Props) => {
    const users = session.getUsers();

    const addUser = () => {
        const userInput = document.getElementById('userInput') as HTMLInputElement;
        const username = userInput.value.trim();
        if (username.length === 0) {
            alert('User name cannot be empty!');
            return; // TODO handle this better
        }
        if (users.find(user => user.getName() === username)) {
            alert('User already exists!');
            return; // TODO handle this better
        }
        userInput.value = '';
        userInput.focus();

        const user = new UserModel(username);
        session.addUser(user);
        setUserIdx(session.getUsers().length - 1);
    }

    return <>
        <select id="userSelector" value={userIdx} onChange={(e) => {
            setUserIdx(parseInt(e.target.value));
        }}>
            <option value={-1}>Select user</option>
            {users.map((user, index) => {
                return <option key={index} value={index}>{user.getName()}</option>
            })}
        </select>
        <input id='userInput' type="text" placeholder="Add user" 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addUser();
                }
            }}
        />
        <button onClick={addUser}>Add</button>
    </>;
};

export default UserSelector;