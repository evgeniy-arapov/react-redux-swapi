import axios from './axiosClient'

export async function getResourcesMap () {
  const {data} = await axios.get('/', {cache: 'default'})
  return data
}

export async function getResourcesByName (name, params) {
  const {data} = await axios.get(`/${name}`, {params})
  return data
}

export async function getResource (name, id) {
  const {data} = await axios.get(`/${name}/${id}`)
  return data
}
