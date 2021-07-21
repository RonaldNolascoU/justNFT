export default function ({ window, app, store, redirect, route }) {
  const isUserSignedIn = store.getters['auth/isLoggedIn']
  const isSigninRoute = route.path === '/signin'

  app.i18n.setLocaleCookie(store.state.lang)
  app.i18n.setLocale(store.state.lang)
  if (route.path != '/' && store.state.modals.age && !isSigninRoute) {
    return redirect('/')
    // return app.router.push('/')
  }

  if (!isUserSignedIn && !isSigninRoute) {
    return redirect('/signin')
    // return app.router.push('/signin')
  }
}
