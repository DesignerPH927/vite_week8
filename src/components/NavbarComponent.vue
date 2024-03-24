<template>
  <header>
    <div class="container">
      <div class="header">
        <h1><a href="#" class="logo">logo</a></h1>
        <ul class="menuList">
          <li><a href="#aboutUS" @click.prevent="aboutUS"
            class="text-nowrap"
            >關於我們<span></span></a></li>
          <li><a href="#newInfo" @click.prevent="newInfo"
            class="text-nowrap">最新資訊<span></span></a></li>
          <li><a href="#products" @click.prevent="products"
            class="text-nowrap"
            >服務項目<span></span></a></li>
          <li><a href="#contact" @click.prevent="contact"
            class="text-nowrap"
            >幸福所在<span></span></a></li>
        </ul>
        <div class="headerIcons text-nowrap">
          <!-- <i class="bi bi-heart-fill headerLove"></i> -->
          <i class="bi bi-cart-plus-fill headerCart"></i>
        </div>
        <button class="headerBtn" type="button">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      changePage: false,
    };
  },
  methods: {
    aboutUS() {
      this.$router.push('/')
        .then(() => {
          const aboutUS = document.querySelector('#aboutUS');
          if (aboutUS) {
            aboutUS.scrollIntoView({ behavior: 'smooth' });
          }
        });
    },
    newInfo() {
      this.$router.push('/')
        .then(() => {
          const newInfo = document.querySelector('#newInfo');
          if (newInfo) {
            newInfo.scrollIntoView({ behavior: 'smooth' });
          }
        });
    },
    products() {
      this.$router.push('/')
        .then(() => {
          const products = document.querySelector('#products');
          if (products) {
            products.scrollIntoView({ behavior: 'smooth' });
          }
        });
    },
    contact() {
      this.$router.push('/')
        .then(() => {
          const contact = document.querySelector('#contact');
          if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
          }
        });
    },
  },
  mounted() {
    const btn = document.querySelector('.headerBtn i');
    const menu = document.querySelector('.menuList');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menuList li a');
    btn.addEventListener('click', () => {
      btn.classList.toggle('bi-x-lg');
      menu.classList.toggle('showMenuList');
      menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', () => {
          menu.classList.remove('showMenuList');
          btn.classList.remove('bi-x-lg');
          menuLink.scrollIntoView({
            behavior: 'smooth',
          });
        });
      });
    });
    window.addEventListener('scroll', () => {
      const value = window.scrollY;
      if (value > 500) {
        header.classList.add('bgActive');
        header.style.transition = '1s';
      } else {
        header.classList.remove('bgActive');
      }
      sections.forEach((item) => {
        // console.log(item);
        const target = item.offsetTop - 150;
        const height = item.offsetHeight;
        const id = item.getAttribute('id');
        const menuActive = document.querySelector(`.menuList li a[href*='${id}']`);
        if (value > target && value <= (target + height)) {
          menuActive.classList.add('active');
        } else {
          menuActive.classList.remove('active');
        }
      });
    });
  },
};
</script>
