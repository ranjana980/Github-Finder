import cat from '../lotties/97680-finding-documents.json'
import Lottie from 'react-lottie';
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import axios from 'axios'
export default function UserData() {
    const [username, setUsername] = useState("")
    const [userInfo, setUserInfo] = useState("")
    const [reposData, setreposData] = useState("")
    const [Loader, setLoader] = useState(false);

    // const history=useNavigate()

    const getData = async () => {
        setLoader(true)
        const result = await axios.get(`https://api.github.com/users/${username}`)
        console.log(result, 'data')
        setUserInfo(result.data)
        // setLoader(true)setLoader(true)
        getRepo()
        setLoader(false)
    }

    const getRepo = async () => {
        const result = await axios.get(`https://api.github.com/users/${username}/repos`)
        // console.log(result, 'data')
        var list = []
        result.data.map((item, index) => {
            if (index <= 5) {
                list.push(item)

            }
        })
        setreposData(list)
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cat,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <div className="container p-md-5 main-div">
                <div className="d-flex ml-5 justify-content-center search">
                    <input className="w-50 form-control ml-5" onKeyDown={(e) => {
                        if (e.key =="Enter") {
                            getData()
                        }
                    }} onChange={(e) => setUsername(e.target.value)} placeholder="Search github by Username..." />
                    <button className="btn btn-default ml-3 bg-primary text-white " onClick={getData}>Search</button>
                </div>
                {userInfo ?
                    <div className='bg-white w-100 mt-5 row '>
                        <div className='col-md-3 col-sm-12 mt-4 '>
                            <div className='ml-2'>
                                <div className='d-flex'>
                                    <img src={userInfo.avatar_url} className="h-50 w-50 p-2 " />
                                </div>
                                <div className='d-flex mt-3'>
                                    <h5 className=''>{userInfo.login}</h5>
                                </div>
                                <div className='d-flex'><PeopleAltIcon /><b className='ml-1'>{userInfo.followers}</b><a className='ml-1' href={userInfo.followers_url}>Followers</a><b className='ml-2'>{userInfo.following}</b><a className='ml-1' href={userInfo.following_url}>Following</a></div>
                            </div>
                        </div>
                        <div className='col-md-9 col-sm-12 p-md-2 repos'>
                            <div className=' view d-flex'>
                                <h5 className='d-flex'>Popular repositories</h5>
                                <Link to={`/Reprosatry/${username}`}><b className='text-primary' ><u>View All</u></b></Link> 
                            </div>
                            <div className='row'>

                                {reposData ? <>
                                    {reposData.map((item) => (
                                        <div className='bg-white ml-1 pl-2 pr-2 h-50 pt-2 pb-1 mt-2 col-md-5 col-sm-10 ' style={{ border: '2px solid lightgray', borderRadius: '5px' }}>
                                            <div className='d-flex justify-content-between'>
                                            <a href={item.html_url} target="_blank"><b style={{ fontSize: '15px' }} className="text-primary">{item.name}</b></a>
                                                <p>{item.visibility}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p style={{ height: '15px', width: '15px', borderRadius: "50%", backgroundColor: item.language == "Python" ? "#007bff" : item.language == "HTML" ? "#ca4f29" : "#c2ab16", marginTop: '8px' }}></p>
                                                <p className='ml-1'>{item.language}</p>
                                            </div>
                                        </div>

                                    ))}

                                </> :Loader? <h1>Don't have any Reprosatry</h1>: <h5>Loading...</h5>}
                            </div>

                        </div>
                    </div>
                    : <div className="mt-5 mr-5">
                        <h2 className='text-success'>Github Finder</h2>
                        <Lottie
                            options={defaultOptions}
                            height={400}
                            width={400}
                        />
                    </div>}
            </div>
        </div>
    )
}