import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/posts">記事一覧</Link></li>
            </ul>
            <h1>ホーム</h1>
        </div>
    )
}

export default Home
