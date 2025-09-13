/**
 * Browser-based Test Script for AFROMYTH Header and Footer
 * Run this in the browser console on https://waldeba.github.io/afromyth.com/products/azizi-frame/
 */

(function() {
    console.log('🧪 AFROMYTH Browser Implementation Test');
    console.log('=======================================\n');

    const tests = [
        {
            name: 'Universal Header - Logo',
            test: () => document.querySelector('#logo a') && document.querySelector('#logo a').textContent.includes('afromyth.'),
            description: 'Logo is present and contains "afromyth."'
        },
        {
            name: 'Universal Header - Navigation',
            test: () => document.querySelector('nav') && document.querySelectorAll('nav a').length >= 5,
            description: 'Navigation menu has at least 5 links'
        },
        {
            name: 'Universal Header - Search Icon',
            test: () => document.querySelector('[aria-label="Search"]'),
            description: 'Search icon is present'
        },
        {
            name: 'Universal Header - Cart Icon',
            test: () => document.querySelector('[aria-label="Cart"]'),
            description: 'Cart icon is present'
        },
        {
            name: 'Universal Footer - Brand',
            test: () => document.querySelector('footer') && document.querySelector('footer').textContent.includes('THE LONG THREAD HOME'),
            description: 'Footer contains brand tagline'
        },
        {
            name: 'Universal Footer - Links',
            test: () => {
                const footer = document.querySelector('footer');
                return footer && 
                       footer.textContent.includes('HELP & FAQ') &&
                       footer.textContent.includes('ABOUT US') &&
                       footer.textContent.includes('CONTACT US');
            },
            description: 'Footer contains navigation links'
        },
        {
            name: 'Universal Footer - Copyright',
            test: () => document.querySelector('footer') && document.querySelector('footer').textContent.includes('© 2025 AFROMYTH'),
            description: 'Footer contains copyright notice'
        },
        {
            name: 'Product Content - Title',
            test: () => document.querySelector('h1') && document.querySelector('h1').textContent.includes('Azizi'),
            description: 'Product title is preserved'
        },
        {
            name: 'Product Content - Price',
            test: () => document.body.textContent.includes('$19.95'),
            description: 'Product price is displayed'
        },
        {
            name: 'Product Content - Add to Cart',
            test: () => document.querySelector('button') && document.querySelector('button').textContent.includes('Add to Cart'),
            description: 'Add to Cart button is present'
        },
        {
            name: 'JavaScript - Search Function',
            test: () => typeof window.toggleSearch === 'function',
            description: 'Search toggle function exists'
        },
        {
            name: 'JavaScript - Category Menu',
            test: () => typeof window.toggleCategoryMenu === 'function',
            description: 'Category menu function exists'
        },
        {
            name: 'JavaScript - Quantity Controls',
            test: () => typeof window.increaseQty === 'function' && typeof window.decreaseQty === 'function',
            description: 'Quantity control functions exist'
        },
        {
            name: 'Responsive Design - Meta Viewport',
            test: () => document.querySelector('meta[name="viewport"]'),
            description: 'Viewport meta tag is present for responsive design'
        },
        {
            name: 'Performance - Page Load',
            test: () => document.readyState === 'complete',
            description: 'Page has loaded completely'
        }
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
        try {
            const result = test.test();
            const status = result ? '✅ PASS' : '❌ FAIL';
            const number = (index + 1).toString().padStart(2, '0');
            
            console.log(`${number}. ${status} ${test.name} - ${test.description}`);
            
            if (result) {
                passed++;
            } else {
                failed++;
            }
        } catch (error) {
            console.log(`${(index + 1).toString().padStart(2, '0')}. ❌ ERROR ${test.name} - ${error.message}`);
            failed++;
        }
    });

    console.log('\n=======================================');
    console.log('BROWSER TEST SUMMARY');
    console.log('=======================================');
    console.log(`Total Tests: ${tests.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${Math.round((passed/tests.length) * 100)}%`);

    if (failed === 0) {
        console.log('\n🎉 All browser tests passed! Live implementation is working correctly.');
    } else {
        console.log(`\n⚠️  ${failed} test(s) failed in the browser. Check the live implementation.`);
    }

    // Additional browser-specific checks
    console.log('\n=======================================');
    console.log('BROWSER-SPECIFIC CHECKS');
    console.log('=======================================');
    
    // Check if images are loading
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            loadedImages++;
        }
    });
    console.log(`📸 Images: ${loadedImages}/${images.length} loaded successfully`);
    
    // Check page title
    console.log(`📄 Page Title: "${document.title}"`);
    
    // Check if CSS is loaded
    const hasCSS = getComputedStyle(document.body).fontFamily !== '';
    console.log(`🎨 CSS Loaded: ${hasCSS ? '✅ Yes' : '❌ No'}`);
    
    console.log('\n🔍 Browser test completed!');
    
    return {
        passed,
        failed,
        total: tests.length,
        successRate: Math.round((passed/tests.length) * 100)
    };
})();
