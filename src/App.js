import React, { useEffect, useState } from 'react';
import './App.css';
import Directory from './Components/Directory';
import ProfilePage from './Components/ProfilePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const userUrl = 'https://jsonplaceholder.typicode.com/users';
  const postUrl = 'https://jsonplaceholder.typicode.com/posts';

  const fetchUserData = async () => {
    let userData = await fetch(userUrl);
    let parsedUserData = await userData.json();
    // console.log(parsedData);
    setUsers(parsedUserData);
  }

  useEffect(() => {
    fetchUserData();
  }, []);


  const fetchPosts = async () => {
    let postData = await fetch(postUrl);
    let parsedPostData = await postData.json();
    setPosts(parsedPostData);
  }



  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Directory users={users}/>} />
          <Route exact path='/:name/:id' element={<ProfilePage users={users} posts={posts} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
