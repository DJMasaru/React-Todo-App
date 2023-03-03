import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {useQuery} from "react-query";
// import {isNumber} from "util";
// import { Link } from 'react-router-dom'

type Task = {
    id: number,
    title: string,
    is_done: boolean,
    created_at:Date,
    updated_at:Date
}

const TaskPage: React.FC = () => {

    /*
    ！！以下は、React Queryを使わない場合の記述となる！！

    // データの保持を行うためにuseStateを使う
    // ここでも型引数としてuseState以下のTaskを記述。空配列としてuseStateの初期値を入れている。
    const [tasks, setTasks] = useState<Task[]>([])

    // バックエンドとのやりとりはasyncで行う
    // 非同期通信はawaitを使う
    // データの取得はaxiosのgetメソッド。取得の際はapiのパスを入力
    const getTasks = async () => {
        // 以下のconstではdataの分割代入を行い、特定のデータだけ取得している
        // get以下のTaskは型引数として指定することで型を守らせられるようになる
        const { data }= await axios.get<Task[]>('http://127.0.0.1:8000/api/tasks')
        console.log(data)

        // axiosで取得したデータをsetTasksに入れる。これは更新関数に相当する。
        setTasks(data)

    }

    useEffect(() =>{
        getTasks()
    })
    */
    // 以下はReact Queryをつかった場合の非同期通信の方法
    // useQueryの第一引数はキーとなる文字列、第二引数に非同期の記述を行う。
    // 一つ目のconstに、dataとstatusが入るようになっている。dataについてはtasksの
    // 変数で使えるように記述しておく。

    const{ data:tasks, status } = useQuery('tasks', async()=> {
        const { data } = await axios.get<Task[]>('http://127.0.0.1:8000/api/tasks')
        return data
    })

    if (status === 'loading'){
        return <div className="loader" />
    } else if (status === 'error'){
        return <div className="align-center">データの読み込みに失敗しました。</div>
    } else if (!tasks || tasks.length <= 0){
        return <div className="align-center">登録されたTODOはありません。</div>
    }

    return (
        <>
            <form className="input-form">
                <div className="inner">
                    <input type="text" className="input" placeholder="TODOを入力してください。" defaultValue="" />
                        <button className="btn is-primary">追加</button>
                </div>
            </form>
            <div className="inner">
                <ul className="task-list">
                    { tasks.map(task => (
                        <li key={task.id}>
                            <label className="checkbox-label">
                                <input type="checkbox" className="checkbox-input" />
                            </label>
                            <div><span>{task.title}</span></div>
                            <button className="btn is-delete">削除</button>
                        </li>
                        ))}
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <form><input type="text" className="input" defaultValue="編集中のTODO" /></form>
                        <button className="btn">更新</button>
                    </li>
                    <li className="done">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input"/>
                        </label>
                        <div><span>実行したTODO</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>ゴミ捨て</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input" />
                        </label>
                        <div><span>掃除</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TaskPage
