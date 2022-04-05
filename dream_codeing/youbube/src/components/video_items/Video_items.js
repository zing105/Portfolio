import React from 'react';

const Video_items = ({video}) => {


    return (
        <li>
           {video.snippet.title} 
        </li>
    );
};

export default Video_items;