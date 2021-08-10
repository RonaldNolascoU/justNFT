export default async (context) => {
  if (!process.browser) return
  try {
    context.store.dispatch('general/nuxtClientInit', context)
  } catch (e) {
    console.error(e)
  }
}
