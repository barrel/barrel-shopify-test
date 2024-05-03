import select from 'select-dom';
import on from 'dom-event';

const initScrollButtons = (el) => {

    document.addEventListener("DOMContentLoaded", function () {
        const buttonPrevious = el.querySelector(".button_previous");
        const buttonNext = el.querySelector(".button_next");
        const productsContainer = el.querySelector(".products_container");


        // Function to update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            const isAtStart = productsContainer.scrollLeft === 0;
            const isAtEnd = productsContainer.scrollLeft + productsContainer.clientWidth >= productsContainer.scrollWidth;

            buttonPrevious.style.opacity = isAtStart ? 0 : 1;
            buttonNext.style.opacity = isAtEnd ? 0 : 1;

        };

        // Event listener for scroll changes
        productsContainer.addEventListener("scroll", updateArrowVisibility);

        // Event listeners for arrow clicks
        buttonPrevious.addEventListener("click", () => {
            const scrollAmount = -productsContainer.offsetWidth;
            productsContainer.scrollTo({
                left: productsContainer.scrollLeft + scrollAmount,
                behavior: "smooth"
            });
        });

        buttonNext.addEventListener("click", () => {
            const scrollAmount = productsContainer.offsetWidth;
            productsContainer.scrollTo({
                left: productsContainer.scrollLeft + scrollAmount,
                behavior: "smooth"
            });
        });

        // Initial check for arrow visibility
        updateArrowVisibility();
        if (productsContainer.scrollWidth > productsContainer.clientWidth) {
            buttonNext.style.opacity = 1;
        }
    });

}

const initCardsProducts = (el,products,productColorPrimary,productColorSecondary,uniqueColorsFilter) => {
    const productsContainer = el.querySelector('.products_container');

    // Group products by variant ID
    const productsByVariant = {};
    products.forEach(product => {
        let variantId = product.variant;

        // If variantId is empty, set it to product title
        if (!variantId) {
            variantId = product.title;
        }

        if (!productsByVariant[variantId]) {
            productsByVariant[variantId] = [];
        }
        productsByVariant[variantId].push(product);
    });


    // Create product cards dynamically
    for (const variantId in productsByVariant) {
        const variantProducts = productsByVariant[variantId];
        variantProducts.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product_card');
            const variant_url = (c) => {
                for (const p of productsByVariant[variantId]) {
                    if (p.color === c) {
                        return p.url;
                    }
                }
                return '#';
            }
            console.log(product)
            productCard.innerHTML = `
                <a class="product_images_container" href="${product.url}">
                    <img src="${product.front_image}" alt="" class="top">
                    <img src="${product.back_image}" alt="" class="bottom">
                </a>
                ${product.tags && product.tags.length > 0
                    ? `<span class="product_badge">${product.tags.map((tag, index) => `<span style="color:${tag.color}; margin-left:${index === 0 ? '0' : '0.42vw'};">${tag.label}</span>`).join('')}</span>`
                    : '<span class="product_badge"></span>'
                }
                <a class="product_title" href="${product.url}" style="text-decoration:none;color:${productColorPrimary};">${product.title}</a>
                ${product.data_rating != "" ? `<a href= "${product.url}">
                <div
                  class="loox-rating"
                  data-id="${product.id}"
                  data-rating="${product.data_rating}"
                  data-raters="${product.data_raters}"
                  data-pattern="[count] Reviews"
                  style="font-size: 15px"
                >
                </div>
              </a>`: ""}
                <div class="bottom_container">
                ${uniqueColorsFilter.map(color => `<a class="color_product" href="${variant_url(color)}" style="background-color: ${color}"></a>`).join('')}
                <a class="see_more" style="color:${productColorSecondary};text-decoration:none;" href="${product.url}"  >See more</a>
                <div class="prices_container"><span class="price_product_compare">${el.getAttribute('showVariants') === 'all_variants' ? product.compare_at_price : el.getAttribute('curreny') + (product.variants[0].compare_at_price / 100).toFixed(2)}</span><span class="price_product">${product.price}</span></div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }
}

const sizeCardInit = (el) => {
    const productsContainer = el.querySelector('.products_container');
    const currentCardSize = productsContainer.classList.contains('compact') ? 'compact' : 'standard';

    // Check if the screen width is below 1080px
    if (window.innerWidth <= 768 && window.innerWidth >= 430) {
        // Reset styles or make adjustments as needed for smaller screens
        productsContainer.style.height = 'fit-content'; // Reset height
        productsContainer.style.gap = '3%'; // Reset gap

        let products = productsContainer.querySelectorAll('.product_card');

        products.forEach((product) => {
            product.style.width = '90%'; // Reset width
        });
    } else if (window.innerWidth < 430) {
        // Reset styles or make adjustments as needed for smaller screens
        productsContainer.style.height = 'fit-content'; // Reset height
        productsContainer.style.gap = '3%'; // Reset gap

        let products = productsContainer.querySelectorAll('.product_card');

        products.forEach((product) => {
            product.style.width = '85%'; // Reset width
        });
    } else {
        // Apply compact styles for larger screens
        if (currentCardSize == 'compact' && window.innerWidth > 650) {
            productsContainer.querySelectorAll(".product_images_container").forEach((c) => {
                c.style.height = 80 / 1.5 + 'vh';
            })
            productsContainer.style.gap = '2%';

            let products = productsContainer.querySelectorAll('.product_card');

            products.forEach((product) => {
                product.style.width = '23%';
            });
        }
    }
}


const initCTAButton = (el,ctaHoverBg,ctaNoHoverBg,ctaNoHovertext,ctaHovertext) => {
    const hoverStyles = `
    #${el.id} .action_button_collection_filter:hover{
        background-color: ${ctaHoverBg};
        border: 2px solid ${ctaNoHoverBg};
        color:${ctaHovertext};
    }
    #${el.id} .action_button_collection_filter{
        background-color: ${ctaNoHoverBg};
        border: 2px solid ${ctaNoHoverBg};
        color:${ctaNoHovertext};
    }
  `;

    const styleElement = document.createElement('style');
    styleElement.textContent = hoverStyles;

    document.head.appendChild(styleElement);
}

const initColorFilter = (el,uniqueColorsFilter) => {
    const colorContainerWrapper = el.querySelector('.colors_picker_wrapper');

    // Create color containers dynamically
    uniqueColorsFilter.forEach(color => {
        const colorContainer = document.createElement('div');
        colorContainer.classList.add('color_container');
        colorContainer.innerHTML = '<div class="color" style="background-color: ' + color + '"></div>';
        colorContainerWrapper.appendChild(colorContainer);
    });
}

const initTypeFilter = (el,uniqueTypesFilter) => {
    const collection_tabs_container = el.querySelector('.collection_tabs_container');

    // Create color containers dynamically
    uniqueTypesFilter.forEach(t => {
        const type = document.createElement('div');
        type.classList.add('collection_tab');
        type.style.color = typesColor;

        const hoverStyles = `
        .collection_tab {
            border-bottom: 2px solid transparent;
          }
        .collection_tab:hover {
          border-bottom: 2px solid ${typesColor};
        }
        .collection_tab_active{
            border-bottom: 2px solid ${typesColor};
        }
      `;

        const styleElement = document.createElement('style');
        styleElement.textContent = hoverStyles;

        document.head.appendChild(styleElement);

        type.innerHTML = t;
        collection_tabs_container.appendChild(type);
    });
}

const typeCollectionTabs = (el,chosen_color,uniqueColorsFilter,products,productColorPrimary,productColorSecondary,chosen_type) => {
    let collection_tabs = el.querySelectorAll(".collection_tab");
    collection_tabs.forEach((collection_tab, key) => {
        collection_tab.addEventListener('click', () => {
            if (chosen_type == uniqueTypesFilter[key]) {
                // Remove the type filter
                chosen_type = "";
                // Update borders for collection tabs
                collection_tabs.forEach((c, index) => {
                    c.style.borderBottom = index === key ? '0px solid #152f4e' : 'none';
                });
            } else {
                chosen_type = uniqueTypesFilter[key];
                // Update borders for collection tabs
                collection_tabs.forEach((c, index) => {
                    c.style.borderBottom = index === key ? '2px solid #152f4e' : 'none';
                });
            }

            // Filter products based on chosen type and color
            const filteredProducts = products.filter(product => {
                return (chosen_color === "" || product.color === chosen_color) && (chosen_type === "" || product.type === chosen_type);
            });

            // Clear previous products
            const productsContainer = el.querySelector('.products_container');
            productsContainer.innerHTML = '';

            // Group products by variant ID
            const productsByVariant = {};
            filteredProducts.forEach(product => {
                let variantId = product.variant;

                // If variantId is empty, set it to product title
                if (!variantId) {
                    variantId = product.title;
                }

                if (!productsByVariant[variantId]) {
                    productsByVariant[variantId] = [];
                }
                productsByVariant[variantId].push(product);
            });

            // Create product cards dynamically for the filtered products
            for (const variantId in productsByVariant) {
                const variantProducts = productsByVariant[variantId];
                variantProducts.forEach((product, index) => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product_card');
                    const variant_url = (c) => {
                        for (const p of productsByVariant[variantId]) {
                            if (p.color === c) {
                                return p.url;
                            }
                        }
                        return '#';
                    }
                    productCard.innerHTML = `
                        <a class="product_images_container" href="${product.url}">
                            <img src="${product.front_image}" alt="" class="top">
                            <img src="${product.back_image}" alt="" class="bottom">
                        </a>
                        ${product.tags && product.tags.length > 0
                            ? `<span class="product_badge">${product.tags.map((tag, index) => `<span style="color:${tag.color}; margin-left:${index === 0 ? '0' : '0.42vw'};">${tag.label}</span>`).join('')}</span>`
                            : '<span class="product_badge"></span>'
                        }
                        <a class="product_title" href="${product.url}" style="text-decoration:none;color:${productColorPrimary};">${product.title}</a>
                        ${product.data_rating != "" ? `<a href= "${product.url}">
                        <div
                          class="loox-rating"
                          data-id="${product.id}"
                          data-rating="${product.data_rating}"
                          data-raters="${product.data_raters}"
                          data-pattern="[count] Reviews"
                          style="font-size: 15px"
                        >
                        </div>
                      </a>`: ""}
                <div class="bottom_container">
                ${uniqueColorsFilter.map(color => `<a class="color_product" href="${variant_url(color)}" style="background-color: ${color}"></a>`).join('')}
                    <a class="see_more" style="color:${productColorSecondary};text-decoration:none;" href="${product.url}"  >See more</a>
                    <div class="prices_container"><span class="price_product_compare">${el.getAttribute('showVariants') === 'all_variants' ? product.compare_at_price : el.getAttribute('curreny') + (product.variants[0].compare_at_price / 100).toFixed(2)}</span><span class="price_product">${product.price}</span></div>
                </div>
                    `;
                    productsContainer.appendChild(productCard);
                });

                const currentCardSize = productsContainer.classList.contains('compact') ? 'compact' : 'standard';
                // Apply compact styles for larger screens
                if (currentCardSize == 'compact' && window.innerWidth > 650) {
                    productsContainer.querySelectorAll(".product_images_container").forEach((c) => {
                        c.style.height = 80 / 1.5 + 'vh';
                    })
                    productsContainer.style.gap = '2%';

                    let products = productsContainer.querySelectorAll('.product_card');

                    products.forEach((product) => {
                        product.style.width = '23%';
                    });
                }
            }


        });
    });
}

const colorFilter = (el,chosen_color,uniqueColorsFilter,products,productColorPrimary,productColorSecondary,chosen_type) => {
    let color_container = el.querySelectorAll(".color_container");
    color_container.forEach((color, key) => {
        color.addEventListener('click', () => {
            let title_section = el.querySelector(".title_section");
            let buttonPrevious = el.querySelector(".button_previous");
            let buttonNext = el.querySelector(".button_next");
            if (chosen_color === uniqueColorsFilter[key]) {
                // Remove the border first
                color.style.border = '';

                // Remove the color filter
                chosen_color = "";
                if (title_section) { title_section.style.color = "black"; }

                buttonNext.style.backgroundColor = "black"; // Set back to default color or remove this line if not needed
                buttonPrevious.style.backgroundColor = "black"; // Set back to default color or remove this line if not needed
                // Update borders for color containers
                color_container.forEach((c, index) => {
                    c.style.border = index === key ? `0px solid ${uniqueColorsFilter[key]}` : 'none';
                });
            } else {
                // Apply the color filter
                if (title_section) {
                    title_section.style.color = uniqueColorsFilter[key];

                }
                buttonNext.style.backgroundColor = uniqueColorsFilter[key];
                buttonPrevious.style.backgroundColor = uniqueColorsFilter[key];
                chosen_color = uniqueColorsFilter[key];
                // Update borders for color containers
                color_container.forEach((c, index) => {
                    c.style.border = index === key ? `1px solid ${uniqueColorsFilter[key]}` : 'none';
                });
            }


            // Filter products based on chosen color and type
            const filteredProducts = products.filter(product => {
                const colorMatch = product.color === chosen_color || chosen_color === "";
                const typeMatch = product.type === chosen_type || chosen_type === "";

                return colorMatch && typeMatch;
            });
            // Clear previous products
            const productsContainer = el.querySelector('.products_container');
            productsContainer.innerHTML = '';

            // Group filtered products by variant ID
            const productsByVariant = {};
            filteredProducts.forEach(product => {
                let variantId = product.variant;

                // If variantId is empty, set it to product title
                if (!variantId) {
                    variantId = product.title;
                }

                if (!productsByVariant[variantId]) {
                    productsByVariant[variantId] = [];
                }
                productsByVariant[variantId].push(product);
            });

            // Create product cards dynamically for the filtered products
            for (const variantId in productsByVariant) {
                const variantProducts = productsByVariant[variantId];
                variantProducts.forEach((product, index) => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product_card');
                    const variant_url = (c) => {
                        for (const p of productsByVariant[variantId]) {
                            if (p.color === c) {
                                return p.url;
                            }
                        }
                        return '#';
                    }
                    productCard.innerHTML = `
                        <a class="product_images_container" href="${product.url}">
                            <img src="${product.front_image}" alt="" class="top">
                            <img src="${product.back_image}" alt="" class="bottom">
                        </a>
                        ${product.tags && product.tags.length > 0
                            ? `<span class="product_badge">${product.tags.map((tag, index) => `<span style="color:${tag.color}; margin-left:${index === 0 ? '0' : '0.42vw'};">${tag.label}</span>`).join('')}</span>`
                            : '<span class="product_badge"></span>'
                        }
                        <a class="product_title" href="${product.url}" style="text-decoration:none;color:${productColorPrimary};">${product.title}</a>
                        ${product.data_rating != "" ? `<a href= "${product.url}">
                        <div
                          class="loox-rating"
                          data-id="${product.id}"
                          data-rating="${product.data_rating}"
                          data-raters="${product.data_raters}"
                          data-pattern="[count] Reviews"
                          style="font-size: 15px"
                        >
                        </div>
                      </a>`: ""}
                <div class="bottom_container">
                ${uniqueColorsFilter.map(color => `<a class="color_product" href="${variant_url(color)}" style="background-color: ${color}"></a>`).join('')}
                <a class="see_more" style="color:${productColorSecondary};text-decoration:none;" href="${product.url}"  >See more</a>
                    <div class="prices_container"><span class="price_product_compare">${el.getAttribute('showVariants') === 'all_variants' ? product.compare_at_price : el.getAttribute('curreny') + (product.variants[0].compare_at_price / 100).toFixed(2)}</span><span class="price_product">${product.price}</span></div>
                </div>
                    `;
                    productsContainer.appendChild(productCard);
                });

                const currentCardSize = productsContainer.classList.contains('compact') ? 'compact' : 'standard';
                // Apply compact styles for larger screens
                if (currentCardSize == 'compact' && window.innerWidth > 650) {
                    productsContainer.querySelectorAll(".product_images_container").forEach((c) => {
                        c.style.height = 80 / 1.5 + 'vh';
                    })
                    productsContainer.style.gap = '2%';

                    let products = productsContainer.querySelectorAll('.product_card');

                    products.forEach((product) => {
                        product.style.width = '23%';
                    });
                }
            }


        });
    });
}

export default (el) => {
        //Get the types color from the them 
        let typesColor = el.getAttribute('typescolor');
        //Get the product primary color
        let productColorPrimary = el.getAttribute('productCardPrimaryColor');
        //Get the product secondary color
        let productColorSecondary = el.getAttribute('productCardSecondaryColor');

        //CTA BUTTON PROPERTIES
        let ctaHoverBg = el.getAttribute('ctaHoverBg');
        let ctaHovertext = el.getAttribute('ctaHoverColor');
        let ctaNoHoverBg = el.getAttribute('ctaNoHoverBg');
        let ctaNoHovertext = el.getAttribute('ctaNoHoverColor');
        let products = JSON.parse(el.querySelector('script[type="application/json"]').innerHTML);
        // Assuming products is an array of products with a 'tags' property
        // PRODUCT TAGS CODE  
        products.forEach(function (product) {
            if (Array.isArray(product.tags) && product.tags.length > 0 && Array.isArray(product.tags) && product.tags.length < 3) {
                // Assuming product.tags is an array with a single element
                var tagsData = product.tags[0];

                product.tags = tagsData
                    .filter(function (tag) {
                        return typeof tag === 'string' && tag.includes(',');
                    })
                    .map(function (tag) {
                        var tagParts = tag.split(',');
                        return {
                            label: tagParts[0],
                            color: tagParts[1]
                        };
                    });
            }
        });

        // Group products by variant ID and replace with variants when show_all_variants is 'all_variants'
        const updatedProducts = [];
        products.forEach(product => {
            if (el.getAttribute('showVariants') === 'all_variants' && product.variants && Array.isArray(product.variants)) {
                product.variants.forEach(variant => {
                    updatedProducts.push({
                        ...product,
                        title: product.title + " - " + variant.title.split("/")[0],
                        price: el.getAttribute('curreny') + " " + (variant.price / 100).toFixed(2), // Use Shopify.formatMoney for formatting
                        compare_at_price: el.getAttribute('curreny') + " " + (variant.compare_at_price / 100).toFixed(2),
                        url: product.url,
                        variant_id: variant.id,
                        front_image: product.front_image,
                        back_image: product.back_image
                    });
                });
            } else {
                updatedProducts.push(product);
            }
        });
        products = updatedProducts;

        // Specific collection type
        products.forEach(function (product) {
            if (Array.isArray(product.type_tag) && product.type_tag.length > 0) {
                // Assuming product.tags is an array with a single element
                var tagsData = product.type_tag[0];

                product.type_tag = tagsData
                    .filter(function (tag) {
                        return typeof tag === 'string' && tag.includes(',');
                    })
                    .map(function (tag) {
                        var tagParts = tag.split(',');
                        return {
                            collection: tagParts[0],
                            type: tagParts[1]
                        };
                    });
            }
        });
        // Extract unique colors from products
        let uniqueColorsFilter = [...new Set(products.map(product => product.color))];

        // Extract types from products
        let uniqueTypesFilter = [...new Set(products.flatMap(product => {
            if (product.type_tag && Array.isArray(product.type_tag)) {
                const matchingTags = product.type_tag.filter(tag => tag.collection === product.collection);
                matchingTags.map(tag => product.type = tag.type);
                return matchingTags.map(tag => tag.type);
            }
            return [];
        }))];

        let chosen_type = ""
        let chosen_color = ""
        //Colors global variant 
        // Group products by variant ID
        let productsByVariant = {};
        products.forEach(product => {
            let variantId = product.variant;

            // If variantId is empty, set it to product title
            if (!variantId) {
                variantId = product.title;
            }

            if (!productsByVariant[variantId]) {
                productsByVariant[variantId] = [];
            }
            productsByVariant[variantId].push(product);
        })

        
        initScrollButtons(el);
        initCardsProducts(el,products,productColorPrimary,productColorSecondary,uniqueColorsFilter);

        // Code for CARD SIZE 
        // Add this code inside the constructor or initialization of your component
        sizeCardInit(el);
        window.addEventListener('resize', () => {
            // Call the sizeCardInit method when the window is resized
            sizeCardInit(el);
        });

        initCTAButton(el,ctaHoverBg,ctaNoHoverBg,ctaNoHovertext,ctaHovertext);

        initColorFilter(el,uniqueColorsFilter);
        initTypeFilter(el,uniqueTypesFilter);

        colorFilter(el,chosen_color,uniqueColorsFilter,products,productColorPrimary,productColorSecondary,chosen_type);
        typeCollectionTabs(el,chosen_color,uniqueColorsFilter,products,productColorPrimary,productColorSecondary,chosen_type);

}
