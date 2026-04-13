<template>
  <section class="collection-section home-page-section custom-product-shell">
    <!--Header -->
    <div class="section-header custom-product-header d-flex align-items-center justify-content-between"
      v-if="hasSectionHeader">
      <div class="section-title mb-0" v-if="
        properties.section_title_t_ && properties.section_title_t_ != null
      ">
        <h3 class="mb-0 section-title custom-product-title">{{ properties.section_title_t_ }}</h3>
      </div>
      <div class="btn-area">
        <a :href="sectionButtonLink" class="view-all-link">
          {{ sectionButtonText }}
        </a>
      </div>
    </div>
    <!--End Header-->
    <div :class="properties.featured_item_position &&
      properties.featured_item_position == 'end'
      ? 'row g-1 g-md-2 section-body flex-row-reverse'
      : 'row g-1 g-md-2 section-body'
      ">
      <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-4 col-sm-5 mb-0 featured_item d-none d-lg-block" v-if="
        properties.featured_item_status &&
        properties.featured_item_status == '1' &&
        featuredItem != null
      ">
        <single-product :item="featuredItem" :featured-image="properties.featured_product_image" featuredStyle />
      </div>
      <div :class="properties.featured_item_status &&
        properties.featured_item_status == '1' &&
        featuredItem != null
        ? 'col-xxl-8 col-xl-7 col-lg-6 col-md-8 col-sm-7 custom_product_list'
        : 'col-12 custom_product_list'
        ">
        <!---Swiper Slide Style-->
        <swiper v-if="products.length && properties.style == 'slider'" ref="swiperRef"
          :slidesPerView="slider_items.desktop" :grid="{
            rows: row_count,
            fill: 'row',
          }" :modules="modules" :spaceBetween="8" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }" :loop="true" :pagination="pagination" @onSlideChange="onSlideChange"
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
        <!---End Swiper Slide Style-->
        <!--List Style-->
        <div class="row g-1 g-md-2 custom-product-list" v-else>
          <div v-for="(item, index) in products" :key="`product-${index}`" :class="`${product_column} custom-product-col`">
            <single-product :item="item" styleEight />
          </div>
        </div>
        <!--End List Style-->
      </div>
    </div>
  </section>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { ref } from "vue";
const SingleProduct = defineAsyncComponent(() =>
  import("../../product/SingleProduct.vue")
);
import "swiper/css";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Grid, Autoplay, Pagination } from "swiper/modules";

export default {
  name: "CustomProduct",
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
    const swiperRef = ref(null);
    return {
      modules: [Grid, Autoplay, Pagination],
      swiperRef,
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
      row_count:
        this.properties.row_count != null ? this.properties.row_count : 1,
      product_column: "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2",
      pagination: { clickable: true },
      featuredItem: null,
    };
  },

  mounted() {
    this.products =
      this.properties["products"] && this.properties["products"]["data"]
        ? this.properties["products"]["data"]
        : [];

    let featured_list =
      this.properties["featured_product"] &&
        this.properties["featured_product"]["data"]
        ? this.properties["featured_product"]["data"]
        : [];

    this.featuredItem = featured_list.length > 0 ? featured_list[0] : null;
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

  methods: {
    onSlideChange(swiper) {
      if (swiper.activeIndex === swiper.slides.length - 1) {
        swiper.slideTo(0);
      }
    },
  },
  computed: {
    hasSectionHeader() {
      return Boolean(this.properties.section_title_t_ || this.sectionButtonText);
    },
    sectionButtonText() {
      const label = this.properties.section_btn_title_t_;
      return label && String(label).trim().length
        ? label
        : "View More Products";
    },
    sectionButtonLink() {
      const link = this.properties.button_link;
      return link && String(link).trim().length ? link : "/products";
    },
  },
};
</script>
<style scoped lang="scss">
.custom-product-shell {
  background: #fff;
  border: 1px solid #eef1f4;
  border-radius: 10px;
  margin-bottom: 0 !important;
  padding: 8px;
}

.custom-product-header {
  margin-bottom: 8px !important;
}

.custom-product-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.view-all-link {
  align-items: center;
  background: transparent;
  border: 0;
  color: #f68b1f;
  display: inline-flex;
  font-size: 15px;
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

.custom-product-list {
  margin-top: 0;
}

.custom-product-col {
  display: flex;
}

.custom-product-col :deep(.single-product-item.style--eight) {
  width: 100%;
}

@media (max-width: 991px) {
  .custom-product-title {
    font-size: 20px;
  }
}

@media (max-width: 575px) {
  .custom-product-shell {
    margin-bottom: 0 !important;
    padding: 6px;
  }

  .custom-product-title {
    font-size: 16px;
  }

  .custom-product-header {
    margin-bottom: 6px !important;
  }

  .view-all-link {
    font-size: 14px;
  }
}
</style>
