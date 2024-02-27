import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMember } from '../actions/membersActions';
import MoviesWatched from './MoviesWatched';
//import SubscribeMovie from './SubscribeMovie';

function Member({ member }) {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const handleEdit = () => {
        navigate(`/edit-member/${member._id}`);
    };

    const handleDelete = () => {
        dispatch(deleteMember(member._id));
        window.location.reload();
      };

    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'500px'}}>
            <h2>{member.Name}</h2>
            Email: {member.Email} 
            <br/>
            City: {member.City}
            <br/>
            {/* Render other member details here */}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <br/>        
            <MoviesWatched memberId={member._id} />           
        </div>
    );
}

export default Member;