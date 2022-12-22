<template>
  <header>
    <div class="title">
      <div class="icon"></div>
      <h1>Secret Notes</h1>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  padding-top: 16vh;
  padding-bottom: 8vh;
  text-align: center;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    h1 {
      color: #1e232a;
      font-size: 24px;
      font-weight: 700;
    }

    .icon {
      width: 32px;
      height: 32px;

      background-color: #1e232a;
      -webkit-mask: url(../assets/user-secret.svg) no-repeat 100% 100%;
      mask: url(../assets/user-secret.svg) no-repeat 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-size: 28px;
      mask-size: 28px;
    }
  }
}
</style>
