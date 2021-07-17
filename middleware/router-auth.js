export default function ({ window, app, store, redirect, route }) {
  const isUserSignedIn = store.state.user || store.state.userAuth
  const isSigninRoute = route.path === '/signin'

  app.i18n.setLocaleCookie(store.state.lang)
  app.i18n.setLocale(store.state.lang)
  if (route.path != '/' && store.state.modals.age && !isSigninRoute) {
    return app.router.push('/')
  }

  if (!isUserSignedIn && !isSigninRoute) {
    return app.router.push('/signin')
  }
}
