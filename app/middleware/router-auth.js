export default function ({ window, app, store, redirect, route }) {
  console.log(route.name)
  if (process.browser) {
    if (
      ['signin', 'privacy-policy', 'creator-signup', 'wallet'].includes(
        route.name
      )
    ) {
      document.body.style.backgroundColor = '#fff'
    }
  }

  const isUserSignedIn = store.state.auth.loggedIn
  const user = store.state.auth.user
  const isSigninRoute = ['/signin'].includes(route.path)
  const isContentCreatorRoute = ['model'].includes(route.name)

  if (
    isUserSignedIn &&
    user &&
    [2, 3].includes(user.role_id) &&
    route.name == 'creator-signup'
  ) {
    return redirect('/')
  }

  if (
    isUserSignedIn &&
    user &&
    user.role_id != 2 &&
    isContentCreatorRoute &&
    route.path == '/me'
  ) {
    return redirect('/')
  }

  app.i18n.setLocaleCookie(app.$cookies.get('jy_locale'))
  app.i18n.setLocale(app.$cookies.get('jy_locale'))

  if (route.path != '/' && !route.path.includes('/signin')) {
    store.commit('general/SET_RETURN_URL', route.fullPath)
  }

  // if (route.path != '/' && store.state.modals.age && !isSigninRoute) {
  //   return redirect('/')
  //   // return app.router.push('/')
  // }

  let isLoggedWithMetaMask = localStorage.getItem('isLoggedWithMetaMask')
  console.log(route.fullPath, isUserSignedIn)
  if (!isUserSignedIn && !isSigninRoute && !isLoggedWithMetaMask) {
    return redirect('/signin')
  }
}
