export function getResourcesNames (state) {
  return Object.keys(state.resources.resourcesMap)
}

export function getResources (state, name) {
  const resources = (state.resources[name] && state.resources[name].data) || {}
  return Object.keys(resources).map(el => resources[el])
}

export function getPageResources (state, name, params) {
  const resources = state.resources[name]
  let resourcesPage
  if(resources) {
    const search = params ? params.search : resources.search
    const page = params ? params.page : resources.page
    if (search)
      resourcesPage = resources.searchPageIds
    else {
      resourcesPage = resources.pageData && resources.pageData[page]
    }
  }
  return resourcesPage ? resourcesPage.map(el => resources.data[el]) : []
}

export function getResourcesMeta (state, name) {
  const resources = state.resources[name]
  if (resources && resources.pageData) {
    console.log(resources)
    const page = +resources.page
    const count = +resources.count
    const perPage = 10
    const lastPage = Math.ceil(count / perPage)
    const search = resources.search

    return {
      page,
      count,
      perPage,
      lastPage,
      search
    }
  }
  return {}
}

export function getResource (state, name, id) {
  return state.resources[name] && state.resources[name].data[id]
}