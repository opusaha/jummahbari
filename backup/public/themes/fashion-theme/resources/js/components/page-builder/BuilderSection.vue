<template>
  <!-- Section Loop -->
  <section v-for="(section, index) in sections" :class="'builder-section ' + sectionVisibility(section)"
    :id="'section_' + section['id'] + '_' + section['page_id']" :key="index">
    <div :class="sectionContainer(section)">
      <div :class="'row mx-0 ' + sectionVertical(section)">
        <!-- Section Layouts Loop -->
        <div v-for="(section_layouts, l_index) in section['layouts']"
          :class="'col-md-' + section_layouts['col_value'] + ' p-0'" :key="l_index">
          <!-- Section Layouts Widgets Loop -->
          <template v-for="(layout_widget, w_index) in section_layouts['layout_widgets']" :key="w_index">
            <div v-if="layout_widget['widget']['name'] !== 'service_feature'" :class="'widget mb-0 ' +
              widgetAlignment(layout_widget) + ' ' +
              widgetVisibility(layout_widget) + ' ' +
              Rtl(layout_widget) +
              ' ' +
              isListBlog(layout_widget)
              " :id="'section_' + section['id'] + '_widget_' + layout_widget['id']">
              <component :is="modifiedWidgetName(layout_widget['widget']['name'])" v-if="
                !isEmpty(layout_widget['properties']) &&
                !isEmpty(layout_widget['properties']['properties'])
              " :properties="layout_widget['properties']['properties']" />
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- Show CategoryListMobile at 2nd position (after 1st section) for Mobile -->
    <category-list-mobile v-if="index === 0 && isMobileScreen()" :properties="findCategoryProperties()" />
  </section>
  <section class="builder-section" v-if="!isEmpty(findServiceFeatureProperties())">
    <div class="custom-container2">
      <service-feature :properties="findServiceFeatureProperties()" />
    </div>
  </section>
</template>
<script>
import { defineAsyncComponent } from "vue";
const Ads = defineAsyncComponent(() => import("./widgets/Ads.vue"));
const Banner = defineAsyncComponent(() => import("./widgets/Banner.vue"));
const Blogs = defineAsyncComponent(() => import("./widgets/Blogs.vue"));
const Button = defineAsyncComponent(() => import("./widgets/Button.vue"));
const ProductSlider = defineAsyncComponent(() =>
  import("./widgets/ProductSlider.vue")
);
const CategoryListMobile = defineAsyncComponent(() =>
  import("./widgets/CategoryListMobile.vue")
);
const CategorySlider = defineAsyncComponent(() =>
  import("./widgets/CategorySlider.vue")
);
const BrandSlider = defineAsyncComponent(() =>
  import("./widgets/BrandSlider.vue")
);
const CategoryList = defineAsyncComponent(() =>
  import("./widgets/CategoryList.vue")
);
const CustomProduct = defineAsyncComponent(() =>
  import("./widgets/CustomProduct.vue")
);
const FeaturedProduct = defineAsyncComponent(() =>
  import("./widgets/FeaturedProduct.vue")
);
const FlashDeal = defineAsyncComponent(() => import("./widgets/FlashDeal.vue"));
const HeadingTag = defineAsyncComponent(() =>
  import("./widgets/HeadingTag.vue")
);
const Image = defineAsyncComponent(() => import("./widgets/Image.vue"));
const ListBlog = defineAsyncComponent(() => import("./widgets/ListBlog.vue"));
const Newsletter = defineAsyncComponent(() =>
  import("./widgets/Newsletter.vue")
);
const ProductCollection = defineAsyncComponent(() =>
  import("./widgets/ProductCollection.vue")
);
const SellerList = defineAsyncComponent(() =>
  import("./widgets/SellerList.vue")
);
const TextEditor = defineAsyncComponent(() =>
  import("./widgets/TextEditor.vue")
);
const ServiceFeature = defineAsyncComponent(() =>
  import("./widgets/ServiceFeature.vue")
);

const Testimonial = defineAsyncComponent(() =>
  import("./widgets/Testimonial.vue")
);

const ContactForm = defineAsyncComponent(() =>
  import("./widgets/ContactForm.vue")
);
export default {
  name: "BuilderSection",
  components: {
    Ads,
    Banner,
    Blogs,
    Button,
    CategorySlider,
    CustomProduct,
    FeaturedProduct,
    FlashDeal,
    HeadingTag,
    Image,
    ListBlog,
    Newsletter,
    ProductCollection,
    SellerList,
    TextEditor,
    CategoryList,
    ProductSlider,
    BrandSlider,
    ServiceFeature,
    Testimonial,
    ContactForm,
    CategoryListMobile
  },
  data() {
    return {
      RTL: document.querySelector("html").className == "rtl" ? "-rtl" : "",
    };
  },

  props: {
    page: {
      type: Object,
      default: {},
    },
    sections: {
      type: Array,
      default: [],
    },
    widgets: {
      type: Array,
      default: [],
    },
  },

  beforeMount() {
    setTimeout(() => {
      this.$emit("sectionLoaded");
    }, 1000);
  },

  methods: {
    /**
     * Widget Name Change
     */
    modifiedWidgetName(name) {
      return name
        .split("_")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join("");
    },

    /**
     * Check Properties
     */
    isEmpty(value) {
      return (
        value == null ||
        value === "" ||
        (typeof value === "object" && Object.keys(value).length === 0)
      );
    },

    /**
     * Check Container
     */
    sectionContainer(section) {
      if (
        !this.isEmpty(section["properties"]) &&
        !this.isEmpty(section["properties"]["properties"])
      ) {
        if (!this.isEmpty(section["properties"]["properties"]["container"])) {
          if (
            section["properties"]["properties"]["container"] === "container"
          ) {
            return "custom-container2";
          }
          return section["properties"]["properties"]["container"];
        }
      }
      return "custom-container2";
    },

    /**
     * Section Vertical Alignment
     */
    sectionVertical(section) {
      if (
        !this.isEmpty(section["properties"]) &&
        !this.isEmpty(section["properties"]["properties"])
      ) {
        if (!this.isEmpty(section["properties"]["properties"]["vertical"])) {
          return (
            "align-items-" + section["properties"]["properties"]["vertical"]
          );
        }
      }
      return "align-items-start";
    },
    //Section visibility
    sectionVisibility(section) {
      let class_name = "";
      if (
        !this.isEmpty(section["properties"]) &&
        !this.isEmpty(section["properties"]["properties"])
      ) {
        let properties = section["properties"]["properties"];

        if ("hide_in_desktop" in properties) {
          class_name = "hide_in_desktop";
        }

        if ("hide_in_mobile" in properties) {
          class_name = class_name + " hide_in_mobile";
        }

        if ("hide_in_tab" in properties) {
          class_name = class_name + " hide_in_tab";
        }
      }
      return class_name;
    },
    //Widget visibility
    widgetVisibility(widget) {
      let class_name = "";
      if (
        !this.isEmpty(widget["properties"]) &&
        !this.isEmpty(widget["properties"]["properties"])
      ) {
        let properties = widget["properties"]["properties"];

        if ("hide_in_desktop" in properties) {
          class_name = "hide_in_desktop";
        }

        if ("hide_in_mobile" in properties) {
          class_name = class_name + " hide_in_mobile";
        }

        if ("hide_in_tab" in properties) {
          class_name = class_name + " hide_in_tab";
        }
      }
      return class_name;
    },

    /**
     * Widget Horizontal Alignment
     */
    widgetAlignment(widget) {
      if (
        !this.isEmpty(widget["properties"]) &&
        !this.isEmpty(widget["properties"]["properties"])
      ) {
        if (!this.isEmpty(widget["properties"]["properties"]["alignment"])) {
          return "text-" + widget["properties"]["properties"]["alignment"];
        }
      }
      return "text-start";
    },

    /**
     * Check If Widget is List Blog
     */
    isListBlog(widget) {
      if (
        !this.isEmpty(widget["widget"]) &&
        !this.isEmpty(widget["widget"]["name"])
      ) {
        if (widget["widget"]["name"] === "list_blog") {
          return "widget_recent_entries";
        }
      }
      return "";
    },

    /**
     * Check if it is mobile screen
     */
    isMobileScreen() {
      return window.innerWidth <= 767;
    },

    /**
     * Find category list properties from sections data
     */
    findCategoryProperties() {
      for (let section of this.sections) {
        for (let layout of section.layouts) {
          for (let widget of layout.layout_widgets) {
            if (widget.widget.name === 'category_list' && widget.properties && widget.properties.properties) {
              return widget.properties.properties;
            }
          }
        }
      }
      return {};
    },

    /**
     * Find service feature properties from sections data
     */
    findServiceFeatureProperties() {
      for (let section of this.sections) {
        for (let layout of section.layouts) {
          for (let widget of layout.layout_widgets) {
            if (widget.widget.name === 'service_feature' && widget.properties && widget.properties.properties) {
              return widget.properties.properties;
            }
          }
        }
      }
      return null;
    },
    /**
     * RTL Check
     */
    Rtl(widget) {
      if (this.widgetAlignment(widget) != "text-center") {
        return this.RTL;
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped>
.text-start-rtl {
  text-align: right !important;
}

.text-end-rtl {
  text-align: left !important;
}

.builder-section {
  overflow: hidden;
}
</style>