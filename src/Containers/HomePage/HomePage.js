import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import { getRealtimeUsers } from '../../Redux/Actions';
import './style.css';

const HomePage = (props) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRealtimeUsers())
    },[])

  return (

    <Layout>

        <section className="container">

    <div className="listOfUsers">

        <div className="displayName">
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div style={{ display:"flex",flex:1, justifyContent:"space-between",margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>Rizwan Khan</span>
                <span>online</span>
            </div>
        </div>
                
    </div>
    <div className="chatArea">
        <div className="chatHeader"> Rizwan Khan </div>
        <div className="messageSections">

            <div style={{ textAlign: 'left' }}>
                <p className="messageStyle" >Hello User</p>
            </div>

        </div>
        <div className="chatControls">
            <textarea />
            <button>Send</button>
        </div>
    </div>
</section>
    </Layout>
    
  );
}

export default HomePage;