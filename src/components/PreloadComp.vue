<template>
  <div class="container">
    <div class="preload"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f0f2f5;
  animation: container 1s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;

  .preload {
    width: 200px;
    height: 200px;
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      display: block;

      background-color: #2688eb;
      -webkit-mask: url(../assets/user-secret.svg) no-repeat 100% 100%;
      mask: url(../assets/user-secret.svg) no-repeat 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-size: 130px;
      mask-size: 130px;
    }

    &::after {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;

      border-radius: 50%;
      animation: preload 1s;
    }
  }
}

@keyframes container {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes preload {
  from {
    box-shadow: inset 0px 0px 0px 100px #f0f2f5;
  }
  to {
    box-shadow: inset 0px 0px 0px 0px #f0f2f5;
  }
}
</style>
