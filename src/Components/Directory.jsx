import React, { useEffect, useState } from 'react';
import './directory.css';
import { useNavigate } from 'react-router';

const Directory = ({users}) => {

    // const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState([]);
    // const userUrl = 'https://jsonplaceholder.typicode.com/users';
    const postUrl = 'https://jsonplaceholder.typicode.com/posts';
    const navigate = useNavigate();

    // const fetchUserData = async () => {
    //     let userData = await fetch(userUrl);
    //     let parsedUserData = await userData.json();
    //     // console.log(parsedData);
    //     setUsers(parsedUserData);
    // }

    // useEffect(() => {
    //     fetchUserData();
    // }, []);

    const fetchPosts = async() => {
        let postData = await fetch(postUrl);
        let parsedPostData = await postData.json();
        setPosts(parsedPostData);

        let data = posts.reduce( (ac, el) => {
            let obj = ac.find(e => e.userId == el.userId);
            if (!obj) {
              obj = {userId: el.userId, count: 0};
              ac.push(obj);
            }
            obj.count = obj.count + 1;
            return ac;
           }, []);
        setPostCount(data);
    }

    useEffect(() => {
        fetchPosts();
    })

    const openProfilePage = (user) => {
        navigate(`/${user.username}/${user.id}`);
    }
    
    return (<>
        <h1>Directory</h1>
        <div className='parent'>
            <center>
                {users.map((user) => (
                    <div className='data' key={user.id} onClick={() => openProfilePage(user)}>
                        <span>Name: {user.name}</span>
                        <span>Posts: {postCount[user.id-1]?.count}</span>
                    </div>
                ))}
            </center>
        </div>
    </>
    )
}

export default Directory;

{/* <div className='data'>
                <span>Name: Akshay</span>
                <span>Posts: 12</span>
            </div> */}
