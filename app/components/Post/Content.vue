<template>
  <div class="xl:pb-14">
    <div class="w-full block xl:hidden navbar mb-5">
      <LayoutSearchBar />
    </div>
    <PostIndex v-for="post in $store.state.posts" :key="post.id" :post="post" />
  </div>
</template>
