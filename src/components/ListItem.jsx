import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem ({data, location}) {
  return (
    <Link to={`${location.pathname}/${data.id}`}>{data.name || data.title}</Link>
  )
}