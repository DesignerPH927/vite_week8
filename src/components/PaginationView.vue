<template>
  <!-- {{ pages }} -->
  <nav aria-label="Page navigation example">
    <ul class="pagination mb-0 justify-content-center">
      <li class="page-item">
        <a
          :class="{'disabled' : !pages.has_pre}"
          @click.prevent="getProducts(pages.current_page - 1)"
          class="page-link"
          href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        v-for="page in pages.total_pages" :key="page"
        :class="{'active' : page === pages.current_page}">
        <a
          @click.prevent="$emit('change-page', page)"
          class="page-link" href="#">{{ page }}
        </a>
      </li>
      <li class="page-item">
        <a
          :class="{'disabled' : !pages.has_next}"
          @click.prevent="getProducts(pages.current_page + 1)"
          class="page-link" href="#"
          aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages', 'getProducts'],
};
</script>
