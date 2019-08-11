//author-date
import store from './createStore'
import moment from 'moment'

const HostUrl = 'http://0.0.0.0:3001'

const GithubUrl = 'https://github.com'
const GithubApiUrl = 'https://api.github.com'

const ClientId = '520d6f455f447749b552'
const ClientSecret = 'db191413fcd1d0434cb2be0e998551351ce6e1a4'

const GetTokenUri = `${HostUrl}/github/login/oauth/access_token` // <-- Здесь прокси: localhost/github -> github.com (CORS)

export const GithubAuthUri = `${GithubUrl}/login/oauth/authorize?client_id=${ClientId}&redirect_uri=${HostUrl}`

const parseCodeUrl = (): string => window.location.search.replace( '?code=', '');
const tokenParser = (text: string) => (text.match(/(?:^access_token=)+([a-z|A-Z|0-9]*)(?=&)/i) || [,null])[1]

const getToken = () => {
  const AuthParam = {
    client_id: ClientId,
    client_secret: ClientSecret,
    code: parseCodeUrl()
  }

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AuthParam)
  }

  fetch(GetTokenUri, option)
    .then(response => response.text())
    .then(commits => {
      const token: string | null = tokenParser(commits)
    
      if (!!token) {
        console.log(token, 'XXXXXXXXx')
        localStorage.setItem('token', token)
        store.dispatch({type: 'LOG_IN'})
      }
      authorization()
    })
    .catch(err => console.log(err, 'YYYYYYYYYYYYYYYYY'))
}

const getUser = () => {
  fetch(`${GithubApiUrl}/user?access_token=${localStorage.getItem('token')}&client_id=${ClientId}&client_secret=${ClientSecret}`)
    .then(response => response.json())
    .then(user => {store.dispatch({type: 'ADD_AVATAR_URL', payload: user.avatar_url}); store.dispatch({type: 'ADD_USER', payload: user.login}); setCommitsInfo(100, store.getState().filter)})
    .catch(err => console.log(err, 'NOT'))
}

const getCommits = (size: number, filter: string = ''): Promise => {
  console.log(store.getState().user, 'WTF')
  const search = '+' + filter.replace(/\s/g, '+')
  return fetch(`${GithubApiUrl}/search/commits?q=author:${store.getState().user}${search}&sort=${store.getState().sortBy}&order=${store.getState().dateSort ? 'asc' : 'desc'}&type=Commits&page=${store.getState().page}&per_page=${size}&client_id=${ClientId}&client_secret=${ClientSecret}`, {headers: {Accept: 'application/vnd.github.cloak-preview'}})
    .then(result => result.json())
    .then(result => {
      console.log(result, 'i')
      store.dispatch({
        type: 'ADD_TOTAL_COUNT',
        payload: result.total_count
      })
      return result.items.map((info) => ({
        owner: info.repository.owner.login,
        ownerURL: info.repository.owner.html_url,
        repo: info.repository.full_name,
        repoURL: info.repository.html_url,
        dateTime: moment(info.commit.author.date).format('DD-MM-YYYY hh:mm a'),
        commitMessage: info.commit.message,
        hash: info.sha
      }))
    })
    .catch(err => {
      console.log('что то пошло не так..')
      console.log(err)
    })
}

export const setCommitsInfo = (size: number, filter: string = '') => {
  getCommits(size, filter)
    .then(result => {
      store.dispatch({
        type: 'ADD_COMMITS_INFO',
        payload: result
      })
      store.dispatch({
        type: 'STOP_LOADER',
      })
    })
}

export const authorization = () => {
  if (!!localStorage.getItem('token')) getUser()
  else if (parseCodeUrl()) getToken()
}

export const updateCommitInfoDebounce = () => {
  const time = 2000
  let isBegin = true
  let searchMessage = ''
  let timerStart: number
  let timer: ReturnType<typeof setTimeout>
  let timerTime: number

  return (size: number, filter: string = '') => {
    store.dispatch({type: "DROP_COMMITS"})
    store.dispatch({type: "START_LOADER"})
    if(isBegin) {
      setCommitsInfo(size, filter)
      isBegin = false
      timerStart = Date.now()
      setTimeout(() => isBegin = true, time)
    } else {
      searchMessage = filter
      timerTime = time - (Date.now() - timerStart)
      clearTimeout(timer)
      timer = setTimeout(() => setCommitsInfo(size, searchMessage), timerTime > 0 ? timerTime : 0)


    }
    
  }
}
