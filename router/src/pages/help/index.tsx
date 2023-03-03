import React from 'react'
import { Link } from 'react-router-dom'

const HelpPage: React.FC = () => {
    return (
        <div className="align-center">
            <h1>ヘルプ</h1>
            <p>
                使い方を解説します。<br />
                このサイトはログインが必要です。
            </p>
        </div>
    )
}

export default HelpPage
