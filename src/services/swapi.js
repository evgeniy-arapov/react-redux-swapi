import axios from "axios"

const baseAPIUrl = "https://swapi.co/api"

export async function getResourcesMap () {
  const {data} = await axios.get(baseAPIUrl + "/")
  return data
}

export async function getResourcesByName (name, params) {
  const {data} = await axios.get(`${baseAPIUrl}/${name}`, {params})
  return data
}

export async function getResource (name, id) {
  const {data} = await axios.get(`${baseAPIUrl}/${name}/${id}`)
  return data
}