<template>
  <div class="w-full flex flex-col items-center mt-5 lg:mt-14">
    <div class="flex justify-between items-center fs-18 fs-res-12 text-pink">
      <div class="mx-3 lg:mx-5"><a href="">Tokenomics</a></div>
      <span class="material-icons fs-5"> fiber_manual_record </span>
      <div class="mx-3 lg:mx-5">
        <a href="">{{ $t('login.contact') }}</a>
      </div>
      <span class="material-icons fs-5"> fiber_manual_record </span>
      <div class="mx-3 lg:mx-5">
        <a href="">{{ $t('login.help') }}</a>
      </div>
      <span class="material-icons fs-5"> fiber_manual_record </span>
      <div class="mx-3 lg:mx-5">
        <a href="">{{ $t('login.about') }}</a>
      </div>
    </div>

    <div class="flex justify-between items-center mt-3 lg:mt-5">
      <a
        class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
        href="https://discord.gg/justyours"
        target="_blank"
      >
        <i class="fs-16 fab fa-discord"></i>
      </a>
      <a
        class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
        href="https://twitter.com/justyoursme"
        target="_blank"
      >
        <i class="fs-16 fab fa-twitter"></i>
      </a>
      <a
        class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
        href="https://t.me/JustYoursMe"
        target="_blank"
      >
        <i class="fs-16 fab fa-telegram-plane"></i>
      </a>
      <a
        class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
        href="https://discord.gg/justyours"
        target="_blank"
      >
        <i class="fs-16 fab fa-instagram"></i>
      </a>
      <a
        class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
        href="https://www.youtube.com/channel/UCtuZ-6bHigaEK3mriX2WVbw"
        target="_blank"
      >
        <i class="fs-16 fab fa-youtube"></i>
      </a>
    </div>
  </div>
</template>
