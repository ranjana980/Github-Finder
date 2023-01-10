// import cat from '../lotties/97680-finding-documents.json'
import Lottie from 'react-lottie';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import copy from "copy-to-clipboard";
import axios from 'axios'
import { useEffect } from 'react';
import { Snackbar ,IconButton} from '@material-ui/core';
function Reprosatry() {
    let { name } = useParams()
    const username = name
    const [Id, setId] = useState("")
    const [reposData, setreposData] = useState("")
    const [Loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false)


    const handleClone = (copyText,item) => {
        setId(item.id)
        copy(copyText);
        setOpen(true)
        setTimeout(()=>{
            setOpen(false)
        },2000)
    }

    useEffect(() => {
        console.log(name, 'name')
        getRepo()
    }, [])

    const getRepo = async () => {
        console.log('data')
        setLoader(true)
        const result = await axios.get(`https://api.github.com/users/${username}/repos`)
        console.log(result, 'data')
        var list = []
        result.data.map((item, index) => {
            list.push(item)
        })
        setreposData(list)
        setLoader(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
          </IconButton>
        </React.Fragment>
      );
        
    return (
        <>
            <h1>All Reprosatries which is Public</h1>
            <div className='row ml-5'>
                {reposData ? <>
                    {reposData.map((item) => (
                        <div className='bg-white ml-1 pl-2 pr-2 h-50 pt-2 pb-1 mt-2 col-md-3 col-sm-10 ' style={{ border: '2px solid lightgray', borderRadius: '5px' }}>
                            <div className='d-flex justify-content-between'>
                                <a href={item.html_url} target="_blank"><b style={{ fontSize: '15px' }} className="text-primary">{item.name}</b></a>
                                <p>{item.visibility}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <p style={{ height: '15px', width: '15px', borderRadius: "50%", backgroundColor: item.language == "Python" ? "#007bff" : item.language == "HTML" ? "#ca4f29" : "#c2ab16", marginTop: '8px' }}></p>
                                    <p className='ml-1'>{item.language}</p>
                                </div>
                                <div className='bg-gray-800 ' style={{ height: '25px', width: '60px', backgroundColor: 'lightgray',cursor:'pointer' }} onClick={() => handleClone(item.clone_url,item)}>
                                    <b style={{ fontSize: '15px' }}>Clone</b> 
                                   {Id==item.id?
                                    <Snackbar
                                    autoHideDuration={6000}
                                    open={open}
                                    action={action}
                                    message="Copied"
                                />:""}
                                </div>
                            </div>
                        </div>

                    ))}

                </> :Loader? <h1>Don't have any Reprosatry</h1>: <h5>Loading...</h5>}
            </div></>



    )
}
export default Reprosatry;