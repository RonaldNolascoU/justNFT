<template>
  <AuthCreatorSignUp></AuthCreatorSignUp>
</template>

<script>
export default {
  layout: 'blank',
  middleware: ['router-auth'],
}
</script>
