export default async (context) => {
  if (!process.browser) return
  try {
    context.store.dispatch('auth/nuxtClientInit', context)
  } catch (e) {
    console.error(e)
  }
}
