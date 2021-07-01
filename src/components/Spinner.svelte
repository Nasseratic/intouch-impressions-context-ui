<div class="w-12 h-12 border-4 border-black rounded-full loader m-5" />

<style>
  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loader {
    border-right-color: transparent;
    animation: loader-rotate 1s linear infinite;
  }
</style>
