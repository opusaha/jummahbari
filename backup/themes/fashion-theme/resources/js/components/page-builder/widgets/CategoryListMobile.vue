<template>
  <!-- Categories -->
  <section class="category-section home-page-section d-lg-none">
    <div class="px-2">
      <swiper v-if="properties.category_list && properties.category_list.length" :modules="modules" :loop="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }" class="category-mobile-slider" :breakpoints="{
          '0': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '480': {
            slidesPerView: 5,
            spaceBetween: 15,
          }
        }">
        <swiper-slide v-for="(cat, index) in properties.category_list" :key="index">
          <div class="cat-item text-center">
            <router-link :to="`/products/category/${cat.slug}`" class="d-block">
              <div class="cat-icon-wrap">
                <img :src="`${cat.icon}`" :alt="cat.name" class="cat-img" />
              </div>
              <span class="cat-name d-block mt-1">
                {{ cat.name }}
              </span>
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <!-- End Categories -->
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

export default {
  name: "CategoryListMobile",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
  props: {
    properties: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.category-section {
  padding: 15px 0;
  background-color: #fff;
}

.cat-icon-wrap {
  width: 70px;
  height: 70px;
  margin: 0 auto;
  padding: 0;
  /* Removed padding to let image fill the box */
  border: 1px solid #efefef;
  border-radius: 50%;
  /* Rounded full */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  overflow: hidden;

  @media (max-width: 400px) {
    width: 60px;
    height: 60px;
  }
}

.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Changed to cover to fill the area */
}

.cat-name {
  font-size: 11px;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-mobile-slider {
  padding-bottom: 5px;
}
</style>
