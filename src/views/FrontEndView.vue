<template>
  <NavbarComponent></NavbarComponent>
  <div class="cartDropBox p-3">
    <div class="card border border-0">
      <i class="bi bi-x-lg fs-4 text-white
      position-absolute top-1 end-2 closeBoxBtn"
      style="cursor: pointer;"></i>
      <div class="card-header text-center
      bg-lilac fw-bold text-white">
        購物車
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle
          text-nowrap">
            <tbody>
              <tr>
                <td width="50px">
                  <div style="width:80px">
                    <img src="https://images.unsplash.com/photo-1518077824767-b1e9bb27ecb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height="50px">
                  </div>
                </td>
                <td width="80px">
                  太陽眼鏡
                </td>
                <td>x300</td>
                <td>
                  <p class="mb-0 text-center">
                    $ 40000
                  </p>
                </td>
                <td>
                  <i class="bi bi-trash-fill
                  fs-3 text-danger"
                  style="cursor:pointer;"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-end fw-bold mt-3 mt-sm-0">
          總價NT$ 400
        </p>
        <button class="btn btn-outline-lilac
        w-100 btn-sm"
        type="button">結帳去</button>
      </div>
    </div>
  </div>
  <!-- <div class="favoriteDropBox p-3">
    <div class="card border border-0">
      <i class="bi bi-x-lg fs-4 text-white
      position-absolute top-1 end-2 closeBoxBtn"
      style="cursor: pointer;"></i>
      <div class="card-header text-center
      bg-lilac fw-bold text-white">
        我的最愛
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle
          text-nowrap">
            <tbody>
              <tr>
                <td width="50px">
                  <div style="width:80px">
                    <img src="https://images.unsplash.com/photo-1518077824767-b1e9bb27ecb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height="50px">
                  </div>
                </td>
                <td width="80px">
                  太陽眼鏡
                </td>
                <td>x300</td>
                <td>
                  <p class="mb-0 text-center">
                    $ 40000
                  </p>
                </td>
                <td>
                  <i class="bi bi-trash-fill
                  fs-3 text-danger"
                  style="cursor:pointer;"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-outline-lilac
        w-100 btn-sm mt-3 mt-sm-0"
        type="button">加入購物車</button>
      </div>
    </div>
  </div> -->
  <RouterView></RouterView>
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss">
.cartDropBox {
  position: fixed;
  top: -100%;
  right: 30px;
  width: 450px;
  z-index: 1000;
  transition: .5s ease;
}
.cartDropBox.showCart {
  top: 80px;
}
// .favoriteDropBox {
//   position: fixed;
//   top: -100%;
//   right: 30px;
//   width: 450px;
//   z-index: 1000;
//   transition: .5s ease;
// }
// .favoriteDropBox.showFavorite {
//   top: 80px;
// }

@media (max-width: 510px) {
  .cartDropBox {
    width: 100%;
    right: initial;
  }
}
</style>
