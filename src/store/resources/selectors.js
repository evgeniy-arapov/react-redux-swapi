import getNested from 'lodash/get'

export function getResourcesNames (state) {
  return Object.keys(state.resources.resourcesMap)
}

export function getResources (state, name) {
  const resources = (state.resources[name] && state.resources[name].data) || {}
  return Object.keys(resources).map(el => resources[el])
}

export function getPageResources (state, name, {page, search} = {}) {
  const resources = state.resources[name]
  let resourcesPage
  if (resources) {
    const isSearch = search !== undefined ? search : resources.search
    if (isSearch) {
      resourcesPage = resources.searchMap.pageIndexes
    } else {
      const currentPage = page || resources.pageMap.page
      resourcesPage = getNested(resources, `pageMap.pagesIndexes[${currentPage}]`)
    }
  }
  return resourcesPage ? resourcesPage.map(el => resources.data[el]) : []
}

export function getResourcesMeta (state, name, search = null) {
  const resources = state.resources[name]

  if (resources) {
    const isSearch = search !== null ? !!search : resources.search
    const searchString = resources.searchMap && resources.searchMap.search
    const currentMap = isSearch ? resources.searchMap : resources.pageMap
    let meta = {
      perPage: 10,
      isSearch,
      search: searchString
    }
    if (currentMap) {
      const page = +currentMap.page
      const count = +currentMap.count
      const lastPage = Math.ceil(count / meta.perPage)

      meta =  {
        ...meta,
        page,
        count,
        lastPage
      }
    }
    return meta
  }
  return {}
}

export function getResource (state, name, id) {
  return state.resources[name] && state.resources[name].data[id]
}