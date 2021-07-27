export default function ({ window, app, store, redirect, route }) {
  const isUserSignedIn = store.getters['auth/isLoggedIn']
  const isSigninRoute = route.path === '/signin'

  console.log(app.$cookies.get('jy_locale'))
  app.i18n.setLocaleCookie(app.$cookies.get('jy_locale'))
  app.i18n.setLocale(app.$cookies.get('jy_locale'))

  console.log(route.path, isUserSignedIn)
  if (route.path != '/' && !route.path.includes('/signin')) {
    store.commit('auth/SET_RETURN_URL', route.fullPath)
  }

  if (route.path != '/' && store.state.modals.age && !isSigninRoute) {
    return redirect('/')
    // return app.router.push('/')
  }

  if (!isUserSignedIn && !isSigninRoute) {
    return redirect('/signin')
    // return app.router.push('/signin')
  }
}
