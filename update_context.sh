#!/bin/bash

# Script to remove MyContext imports and replace context.alertBox calls
# Run this script to fix all remaining MyContext import errors

# List of files to update
files=(
    "src/Pages/Checkout/index.jsx"
    "src/Pages/ForgotPassword/index.jsx" 
    "src/Pages/MyAccount/addAddress.jsx"
    "src/Pages/MyAccount/address.jsx"
    "src/Pages/MyAccount/addressBox.jsx"
    "src/Pages/MyAccount/index.jsx"
    "src/Pages/MyList/index.jsx"
    "src/Pages/MyList/myListItems.jsx"
    "src/Pages/Orders/success.jsx"
    "src/Pages/ProductDetails/reviews.jsx"
    "src/Pages/Search/index.jsx"
    "src/Pages/Verify/index.jsx"
    "src/components/AccountSidebar/index.jsx"
    "src/components/AdsBannerSlider/index.jsx"
    "src/components/AdsBannerSliderV2/index.jsx"
    "src/components/CartPanel/index.jsx"
    "src/components/Footer/index.jsx"
    "src/components/Header/Navigation/MobileNav.jsx"
    "src/components/HomeCatSlider/index.jsx"
    "src/components/HomeSliderV2/index.jsx"
    "src/components/ProductDetails/index.jsx"
    "src/components/ProductItemListView/index.jsx"
    "src/components/ProductZoom/index.jsx"
    "src/components/ProductsSlider/index.jsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        
        # Remove MyContext import line
        sed -i '' '/import.*MyContext.*from.*App/d' "$file"
        
        # Remove useContext import if it exists and no other context usage
        sed -i '' 's/useContext, //g' "$file"
        sed -i '' 's/, useContext//g' "$file"
        
        # Replace context.alertBox with alertBox
        sed -i '' 's/context\.alertBox/alertBox/g' "$file"
        
        echo "Updated $file"
    else
        echo "File $file not found, skipping..."
    fi
done

echo "Batch update completed!"