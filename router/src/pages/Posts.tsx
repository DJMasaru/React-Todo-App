import React from 'react'
import {Link} from "react-router-dom";

const Posts: React.FC = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/posts">記事一覧</Link></li>
            </ul>
            <h1>記事一覧</h1>
        </div>
    )
}

export default Posts
