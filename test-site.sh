#!/bin/bash

echo "🧪 AFROMYTH HUGO SITE TEST SCRIPT"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0

run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_pattern="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "${BLUE}Test $TOTAL_TESTS: $test_name${NC}"
    
    if eval "$test_command" | grep -q "$expected_pattern"; then
        echo -e "${GREEN}✅ PASSED${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAILED${NC}"
        echo "Expected pattern: $expected_pattern"
        echo "Actual output:"
        eval "$test_command"
    fi
    echo ""
}

# Test 1: Check if Hugo config is valid
run_test "Hugo Configuration" "hugo config 2>&1" "baseurl"

# Test 2: Check if Hugo can build the site
run_test "Hugo Build" "hugo --quiet 2>&1 && echo 'BUILD_SUCCESS'" "BUILD_SUCCESS"

# Test 3: Check if server is running
run_test "Server Status" "curl -s -o /dev/null -w '%{http_code}' http://localhost:1313/afromyth.com/" "200"

# Test 4: Check if home page contains Pinterest grid
run_test "Home Page Content" "curl -s http://localhost:1313/afromyth.com/" "pinterest-grid"

# Test 5: Check if navigation menu is present
run_test "Navigation Menu" "curl -s http://localhost:1313/afromyth.com/" "MASKS.*STATUES.*CARVINGS"

# Test 6: Check if header logo is present
run_test "Header Logo" "curl -s http://localhost:1313/afromyth.com/" "afromyth"

# Test 7: Check if footer is present
run_test "Footer Content" "curl -s http://localhost:1313/afromyth.com/" "THE LONG THREAD HOME"

# Test 8: Check if CSS styles are loaded
run_test "CSS Styles" "curl -s http://localhost:1313/afromyth.com/" "pinterest-container"

# Test 9: Check if JavaScript is loaded
run_test "JavaScript Functions" "curl -s http://localhost:1313/afromyth.com/" "addToCart"

# Test 10: Check section pages exist
for section in "masks-statues-carvings" "ethiopian-orthodox-crosses" "apparel-textiles-jewelry" "books-icons-manuscripts" "tokens-medals-pins"; do
    run_test "Section Page: $section" "curl -s -o /dev/null -w '%{http_code}' http://localhost:1313/afromyth.com/$section/" "200"
done

# Test 11: Check if templates exist
echo -e "${BLUE}File Structure Tests:${NC}"
for template in "layouts/index.html" "layouts/partials/head.html" "layouts/partials/header.html" "layouts/partials/footer.html" "layouts/partials/scripts.html" "layouts/_default/baseof.html" "layouts/_default/list.html"; do
    if [ -f "$template" ]; then
        echo -e "${GREEN}✅ $template exists${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ $template missing${NC}"
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
done

# Test 12: Check content structure
echo -e "${BLUE}Content Structure Tests:${NC}"
for content in "content/_index.md" "hugo.yaml"; do
    if [ -f "$content" ]; then
        echo -e "${GREEN}✅ $content exists${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ $content missing${NC}"
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
done

# Test 13: Check if menu configuration is correct
run_test "Menu Configuration" "grep -r 'MASKS.*STATUES.*CARVINGS' hugo.yaml" "MASKS"

# Test 14: Check mobile responsiveness classes
run_test "Mobile Responsive CSS" "curl -s http://localhost:1313/afromyth.com/" "max-width.*768px"

# Test 15: Check Hugo version compatibility
run_test "Hugo Version" "hugo version 2>&1" "v0.148"

echo ""
echo "🏁 TEST SUMMARY"
echo "==============="
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $((TOTAL_TESTS - PASSED_TESTS))${NC}"
echo -e "${YELLOW}Total:  $TOTAL_TESTS${NC}"
echo ""

if [ $PASSED_TESTS -eq $TOTAL_TESTS ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! Your Hugo site is working perfectly!${NC}"
    echo ""
    echo -e "${BLUE}📋 Site Information:${NC}"
    echo "🌐 Development URL: http://localhost:1313/afromyth.com/"
    echo "🔧 Hugo Version: $(hugo version | cut -d' ' -f2)"
    echo "📦 Total Pages: $(hugo --quiet | grep -o 'Pages.*[0-9]*' | grep -o '[0-9]*')"
    echo "🎨 Templates: Universal header/footer implemented"
    echo "📱 Mobile: Responsive design enabled"
    echo "🛒 Features: Shopping cart, search, navigation"
else
    echo -e "${RED}❌ Some tests failed. Please check the issues above.${NC}"
    exit 1
fi
