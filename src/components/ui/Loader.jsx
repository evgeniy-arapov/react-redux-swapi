import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import './Loader.scss'

export default function Loader (props) {
  if (!props.show) return null
    
  return (
      <div className="loader">
        <CircularProgress color="primary" size={100}/>
      </div>
    )
}