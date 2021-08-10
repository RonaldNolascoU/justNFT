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
  const isSigninRoute = ['/signin', '/creator-signup'].includes(route.path)

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
  console.log(route.fullPath)
  if (!isUserSignedIn && !isSigninRoute && !isLoggedWithMetaMask) {
    return redirect('/signin')
  }
}
