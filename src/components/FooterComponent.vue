<template>
  <footer class="p-md-4 p-3">
    <div class="container">
      <div class="row row-cols-md-3 row-cols-1">
        <div class="col">
          <p>Designer: Sunny</p>
          <p>Engineer： Zack</p>
          <p style="cursor: pointer;">
            <RouterLink to="/login" class="text-white text-decoration-underline">
              <i class="bi bi-person-fill-lock fs-3"
              ></i>
              <span>後台</span>
            </RouterLink>
          </p>
          <p style="font-size: 15px;">
            <i class="bi bi-c-circle-fill
            "></i>
            2024『結好婚』
            此網站僅做為個人學習使用，非商業用途
          </p>
        </div>
        <div class="col d-flex align-items-md-center
        justify-content-center order-lg-1 order-2">
          <i class="bi bi-arrow-up-square-fill
          footerTop"
          style="cursor:pointer;"></i>
        </div>
        <div class="col d-flex
        justify-content-md-center
        align-item-md-center order-lg-2 order-1">
          <ul class="socialIcons
          list-unstyled">
            <li><a href="https://www.facebook.com.tw">
              <i class="bi bi-facebook"></i>
            </a></li>
            <li><a href="https://www.instagram.com/">
              <i class="bi bi-instagram"></i>
            </a></li>
            <li><a href="https://line.me/tw/">
              <i class="bi bi-line"></i>
            </a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  mounted() {
    const footerTop = document.querySelector('.footerTop');
    footerTop.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  },
};
</script>
