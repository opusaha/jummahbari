<template>
  <section class="deals-section home-page-section product-collection-compact section-shell">
    <div class="section-header section-header-compact d-flex align-items-center justify-content-between" v-if="hasSectionHeader">
      <h3 class="mb-0 section-title section-title-compact" v-if="sectionTitle">{{ sectionTitle }}</h3>
      <a :href="sectionButtonLink" class="view-all-link">{{ sectionButtonText }}</a>
    </div>

    <swiper v-if="products.length && properties.style == 'slider'" :slidesPerView="slider_items.desktop"
      :modules="modules" :spaceBetween="8" :loop="true" :pagination="pagination"
      class="product-grid-slider theme-slider-dots" :breakpoints="{
        '0': {
          slidesPerView: slider_items.mobile,
        },
        '768': {
          slidesPerView: slider_items.tab,
        },
        '1024': {
          slidesPerView: slider_items.desktop,
        },
      }">
      <swiper-slide v-for="(item, index) in products" :key="`slide-${index}`">
        <single-product :item="item" styleEight />
      </swiper-slide>
    </swiper>
    <div class="row g-1 g-md-2 product-collection-grid" v-else>
      <div
        v-for="(item, index) in products"
        :key="`product-${index}`"
        :class="`${product_column} product-collection-col`"
      >
        <single-product :item="item" styleEight />
      </div>
    </div>
  </section>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
const SingleProduct = defineAsyncComponent(() =>
  import("../../product/SingleProduct.vue")
);

export default {
  name: "ProductCollection",
  components: {
    Swiper,
    SwiperSlide,
    SingleProduct,
  },

  props: {
    properties: {
      type: Object,
      default: {},
    },
  },

  setup() {
    return {
      modules: [Autoplay, Pagination],
    };
  },

  data() {
    return {
      products: [],
      slider_items: {
        mobile: 2,
        tab: 3,
        desktop: 6,
      },
      product_column: "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2",
      pagination: { clickable: true },
    };
  },

  mounted() {
    this.products =
      this.properties["products"] && this.properties["products"]["data"]
        ? this.properties["products"]["data"]
        : [];

    this.product_column = this.properties["column"] ?? this.product_column;
    this.pagination = this.properties["pagination"] ? this.pagination : false;

    this.slider_items.mobile = this.properties["slide_item_sm"]
      ? parseInt(this.properties["slide_item_sm"])
      : this.slider_items.mobile;
    this.slider_items.tab = this.properties["slide_item_md"]
      ? parseInt(this.properties["slide_item_md"])
      : this.slider_items.tab;
    this.slider_items.desktop = this.properties["slide_item_lg"]
      ? parseInt(this.properties["slide_item_lg"])
      : this.slider_items.desktop;
  },

  methods: {},
  computed: {
    sectionTitle() {
      const title = this.properties.section_title_t_;
      return title && String(title).trim().length ? title : "";
    },
    sectionButtonText() {
      const label = this.properties.section_btn_title_t_;
      return label && String(label).trim().length
        ? label
        : "View More Products";
    },
    sectionButtonLink() {
      const link = this.properties.button_link;
      if (link && String(link).trim().length) {
        return link;
      }
      if (this.properties.collection_id) {
        return `/collection/${this.properties.collection_id}`;
      }
      return "/products";
    },
    hasSectionHeader() {
      return Boolean(this.sectionTitle || this.sectionButtonText);
    },
  },
};
</script>

<style scoped lang="scss">
.product-collection-compact {
  padding: 0;
}

.section-shell {
  background: #fff;
  border: 1px solid #eef1f4;
  border-radius: 10px;
  margin-bottom: 0 !important;
  padding: 8px;
}

.section-header-compact {
  margin-bottom: 8px;
}

.section-title-compact {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
}

.view-all-link {
  align-items: center;
  background: transparent;
  border: 0;
  color: #f68b1f;
  display: inline-flex;
  font-size: 14px;
  font-weight: 700;
  gap: 4px;
  padding: 0;
  text-decoration: none;
}

.view-all-link::after {
  content: "›";
  font-size: 18px;
  line-height: 1;
}

.view-all-link:hover {
  color: #e16f00;
}

.product-collection-grid {
  margin-top: 0;
}

.product-collection-col {
  display: flex;
}

.product-collection-col :deep(.single-product-item.style--eight) {
  width: 100%;
}

@media (max-width: 575px) {
  .section-shell {
    margin-bottom: 0 !important;
    padding: 6px;
  }

  .section-header-compact {
    margin-bottom: 6px;
  }

  .section-title-compact {
    font-size: 16px;
  }
}
</style>
