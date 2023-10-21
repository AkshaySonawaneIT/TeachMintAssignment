import React, { useEffect, useState } from 'react';
import './profilePage.css';
import { useNavigate, useParams } from 'react-router';
import Moment from 'moment';

const ProfilePage = ({ users, posts }) => {

    const [timezone, setTimezone] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalPost, setModalPost] = useState({});
    const [zoneTime, setZoneTime] = useState(null);
    const [isRunning, setIsRunning] = useState(true);
    // const [elapsedTime, setElapsedTime] = useState(0);
    const { id } = useParams();
    var user = null;

    const navigate = useNavigate();

    const timeUrl = 'http://worldtimeapi.org/api/timezone';

    const fetchTimezones = async () => {
        const time = await fetch(timeUrl);
        const parsedTime = await time.json();
        // console.log(parsedTime);
        setTimezone(parsedTime);
        getTimeZone('Africa/Abidjan');
    }

    const getTimeZone = async (value) => {
        // console.log("Timezone");
        // console.log(value)
        const data = await fetch(`${timeUrl}/${value}`);
        const parsedZone = await data.json();
        const formatDat = Moment(parsedZone.datetime, 'hh:mm:ss').format('HH:mm:ss');
        // const formatDat = Date.parse(parsedZone.datetime);
        // console.log(formatDat)
        setZoneTime(formatDat);
    }

    const displayModal = (post) => {
        console.log(post);
        setModalPost(post);
        setModal(!modal);
    }

    useEffect(() => {
        // fetchPosts();
        fetchTimezones();

    }, []);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setZoneTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    // console.log("Users :" +users[id-1]);
    user = users[id - 1];

    return (
        <div>
            <div className='header' onClick={() => setModal(false)}>
                <button onClick={() => navigate('/')}>Back</button>
                <select onChange={(e) => getTimeZone(e.target.value)}>{timezone.map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
                ))}</select>
                <h4>{zoneTime}</h4>
                <button onClick={handleStartPause}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
            </div>
            <h1 onClick={() => setModal(false)}>Profile Page</h1>
            <div className='profile' onClick={() => setModal(false)}>
                <div>
                    <span className='heading'>{user?.name}</span><br />
                    <span> {user?.username} | {user?.company?.catchPhrase} </span>
                </div>
                <div>
                    <span>{user?.address?.street}, {user?.address?.suite}, {user?.address?.city}, {user?.address?.zipcode}</span><br />
                    <span>{user?.email} | {user?.phone}</span>
                </div>
            </div>
            <div className='postBody'>
                <div className='posts'>
                    {posts.map((post) => (id == post.userId ? (
                        <div className='card' key={post.id} onClick={() => displayModal(post)}>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>

                    ) : <div key={post.id} style={{ display: 'none' }}></div>))}
                </div>
                <div className='modal' style={{ display: modal ? '' : 'none' }}>
                    <div className='modalCard'>
                        <h4>{modalPost.title}</h4>
                        <p>{modalPost.body}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
