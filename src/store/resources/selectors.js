export function getResourcesNames (state) {
  return Object.keys(state.resources.resourcesMap)
}

export function getResources (state, name) {
  const resources = (state.resources[name] && state.resources[name].data) || {}
  return Object.keys(resources).map(el => resources[el])
}

export function getPageResources (state, name, page) {
  const resources = state.resources[name]
  const resourcesPage = (resources && resources.pageData && resources.pageData[page || resources.page]) || []
  return resourcesPage.map(el => resources.data[el])
}

export function getResourcesMeta (state, name) {
  const resources = state.resources[name]
  if(resources && resources.pageData) {
    const page = +resources.page
    const count = +resources.count
    const perPage = 10
    const lastPage = Math.ceil(count / perPage)

    return {
      page,
      count,
      perPage,
      lastPage
    }
  }
  return {}
}

export function getResource (state, name, id) {
  return state.resources[name] && state.resources[name].data[id]
}