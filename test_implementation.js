#!/usr/bin/env node

/**
 * Test Script for AFROMYTH Header and Footer Implementation
 * This script tests the product page to ensure proper header and footer integration
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 AFROMYTH Implementation Test Script');
console.log('=====================================\n');

// Test file path - prioritize source file over Hugo-generated
const testFile = './products/azizi-frame/index.html';

// Check if file exists
if (!fs.existsSync(testFile)) {
    console.error('❌ Test file not found:', testFile);
    process.exit(1);
}

// Read the file content
const content = fs.readFileSync(testFile, 'utf8');

// Also read CSS file if it exists (for Hugo-generated sites)
const cssFile = './public/css/styles.css';
const cssContent = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, 'utf8') : '';
const allContent = content + cssContent;

// Test cases
const tests = [
    {
        name: 'Universal Header - Logo Implementation',
        test: () => content.includes('afromyth.') && content.includes('<h1 id="logo">'),
        description: 'Checks if universal logo "afromyth." is present in header'
    },
    {
        name: 'Universal Header - Navigation Menu',
        test: () => content.includes('MASKS + STATUES + CARVINGS') && 
                   content.includes('ETHIOPIAN ORTHODOX CROSSES') &&
                   content.includes('APPAREL + TEXTILES + JEWELRY'),
        description: 'Verifies navigation menu items are present'
    },
    {
        name: 'Universal Header - Search Functionality',
        test: () => content.includes('toggleSearch()') && content.includes('searchBar'),
        description: 'Checks if search functionality is implemented'
    },
    {
        name: 'Universal Header - Cart Icon',
        test: () => content.includes('c2_bag.svg') && content.includes('Cart icon'),
        description: 'Verifies cart icon is present'
    },
    {
        name: 'Universal Header - Mobile Menu',
        test: () => content.includes('toggleCategoryMenu()') && content.includes('hamburger'),
        description: 'Checks if mobile hamburger menu is implemented'
    },
    {
        name: 'Universal Footer - Brand Section',
        test: () => content.includes('THE LONG THREAD HOME') && content.includes('rammetto-font'),
        description: 'Verifies footer brand section with proper styling'
    },
    {
        name: 'Universal Footer - Navigation Links',
        test: () => content.includes('HELP & FAQ') && 
                   content.includes('ABOUT US') &&
                   content.includes('CONTACT US') &&
                   content.includes('TERMS & CONDITIONS') &&
                   content.includes('PRIVACY POLICY'),
        description: 'Checks if all footer navigation links are present'
    },
    {
        name: 'Universal Footer - Payment Methods',
        test: () => content.includes('payments-50.png') && content.includes('Payment Methods'),
        description: 'Verifies payment methods section'
    },
    {
        name: 'Universal Footer - Copyright',
        test: () => content.includes('© 2025 AFROMYTH'),
        description: 'Checks copyright notice'
    },
    {
        name: 'Product Content Preservation - Title',
        test: () => content.includes('Azizi 5″ x 7″ Standing Frame'),
        description: 'Ensures original product title is preserved'
    },
    {
        name: 'Product Content Preservation - Price',
        test: () => content.includes('$19.95'),
        description: 'Verifies product price is maintained'
    },
    {
        name: 'Product Content Preservation - SKU',
        test: () => content.includes('10017PK2'),
        description: 'Checks if product SKU is preserved'
    },
    {
        name: 'Product Content Preservation - Gallery',
        test: () => content.includes('gallery-img') && content.includes('picsum.photos'),
        description: 'Ensures product gallery is intact'
    },
    {
        name: 'Product Content Preservation - Add to Cart',
        test: () => content.includes('Add to Cart') && content.includes('addToCart()'),
        description: 'Verifies add to cart functionality is preserved'
    },
    {
        name: 'Responsive Design - Mobile Styles',
        test: () => allContent.includes('@media (max-width: 768px)') && 
                   allContent.includes('@media (max-width: 480px)'),
        description: 'Checks if responsive styles are implemented'
    },
    {
        name: 'JavaScript Functionality - Category Menu',
        test: () => content.includes('function toggleCategoryMenu()') &&
                   content.includes('getElementById("catDropdown")'),
        description: 'Verifies category menu JavaScript functionality'
    },
    {
        name: 'JavaScript Functionality - Search Toggle',
        test: () => content.includes('function toggleSearch()') &&
                   content.includes('getElementById("searchBar")'),
        description: 'Checks search toggle JavaScript'
    },
    {
        name: 'JavaScript Functionality - Quantity Controls',
        test: () => content.includes('function increaseQty()') &&
                   content.includes('function decreaseQty()'),
        description: 'Ensures quantity control functions are preserved'
    },
    {
        name: 'Accessibility - ARIA Labels',
        test: () => content.includes('aria-label="Search"') &&
                   content.includes('aria-label="Cart"'),
        description: 'Verifies accessibility attributes are present'
    },
    {
        name: 'CSS Structure - Variables',
        test: () => allContent.includes(':root {') &&
                   allContent.includes('--font-') &&
                   allContent.includes('--color-'),
        description: 'Checks if CSS custom properties are defined'
    }
];

// Run tests
let passed = 0;
let failed = 0;

console.log('Running tests...\n');

tests.forEach((test, index) => {
    const result = test.test();
    const status = result ? '✅ PASS' : '❌ FAIL';
    const number = (index + 1).toString().padStart(2, '0');
    
    console.log(`${number}. ${status} ${test.name}`);
    console.log(`    ${test.description}`);
    
    if (result) {
        passed++;
    } else {
        failed++;
        console.log(`    ⚠️  This test failed - check implementation`);
    }
    console.log('');
});

// Summary
console.log('=====================================');
console.log('TEST SUMMARY');
console.log('=====================================');
console.log(`Total Tests: ${tests.length}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`Success Rate: ${Math.round((passed/tests.length) * 100)}%`);

if (failed === 0) {
    console.log('\n🎉 All tests passed! Implementation is complete and correct.');
} else {
    console.log(`\n⚠️  ${failed} test(s) failed. Please review the implementation.`);
}

// Additional file structure validation
console.log('\n=====================================');
console.log('FILE STRUCTURE VALIDATION');
console.log('=====================================');

const requiredFiles = [
    './images/s3_search.svg',
    './images/c2_bag.svg',
    './images/payments/payments-50.png'
];

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
    }
});

// File size check
const stats = fs.statSync(testFile);
const fileSizeKB = Math.round(stats.size / 1024);
console.log(`\n📄 File size: ${fileSizeKB} KB`);

if (fileSizeKB > 500) {
    console.log('⚠️  Large file size - consider optimization');
} else {
    console.log('✅ File size is reasonable');
}

console.log('\n🔍 Test completed!');
