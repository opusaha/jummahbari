<section class="popular-products-wrap">
    <div class="container">
        <div class="popular-products-header">
            <h2 class="title">Our popular product</h2>
        </div>

        <div class="popular-products-grid">
            @foreach ($popularProducts as $product)
                <a href="{{ $product->url() }}" class="popular-product-item">
                    <div class="popular-product-image">
                        <img
                            src="{{ data_get($product, 'base_image.path', asset('build/assets/placeholder_image.png')) }}"
                            alt="{{ $product->name }}"
                            loading="lazy"
                        />
                    </div>

                    <h3 class="popular-product-name">{{ $product->name }}</h3>

                    <div class="popular-product-price">
                        {{ $product->selling_price->format() }}
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</section>
