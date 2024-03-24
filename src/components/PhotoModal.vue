<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-lilac">
          <h1 class="modal-title fs-5 text-white"
            id="exampleModalLabel">
            攝影師作品
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body"
        style="background: #ffeeff;">
          <div id="carouselExampleAutoplaying" class="carousel slide"
            data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0" class="active" aria-current="true"
                aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="3000">
                <img src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="d-block
                h-100 bg-cover">
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="d-block
                h-100 bg-cover">
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block
                h-100 bg-cover">
              </div>
            </div>
            <button class="carousel-control-prev" type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon"
                aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next">
              <span class="carousel-control-next-icon"
              aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../mixins/modal';

export default {
  mixins: [modalMixins],
};
</script>
