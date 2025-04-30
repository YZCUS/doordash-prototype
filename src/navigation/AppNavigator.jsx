import React from 'react';

// Page Imports
import LoginPage from '../components/pages/LoginPage';
import SignupPage from '../components/pages/SignupPage';
import HomePage from '../components/pages/HomePage';
import RecommendationsPage from '../components/pages/RecommendationsPage';
import HistoryPage from '../components/pages/HistoryPage';
import FavoritesPage from '../components/pages/FavoritesPage';
import SettingsPage from '../components/pages/SettingsPage';
import CartPage from '../components/pages/CartPage';
import StorePage from '../components/pages/StorePage';
import CheckoutSummaryPage from '../components/pages/CheckoutSummaryPage';
import ReceiptPage from '../components/pages/ReceiptPage';
import SimplePage from '../components/common/SimplePage';
import PopularNearbyPage from '../components/pages/PopularNearbyPage';

// Navigation Component
// This component renders the correct page based on the currentPage state
export default function AppNavigator({
    currentPage,
    navigateTo,
    // Props needed by pages
    mode,
    orderCategories,
    cuisineCategories,
    promotionalAds,
    popularStores,
    recentOrders,
    guessYouLike,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    balance,
    currentStore,
    addToCart,
    currentOrderDetails,
}) {
    // Function to render the current page based on state
    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <LoginPage navigateTo={navigateTo} />;
            case 'signup':
                return <SignupPage navigateTo={navigateTo} />;
            case 'home':
                return <HomePage
                    orderCategories={orderCategories}
                    cuisineCategories={cuisineCategories}
                    promotionalAds={promotionalAds}
                    popularStores={popularStores}
                    recentOrders={recentOrders}
                    guessYouLike={guessYouLike}
                    navigateTo={navigateTo}
                />;
            case 'recommend': return <RecommendationsPage navigateTo={navigateTo} />;
            case 'history': return <HistoryPage navigateTo={navigateTo} />;
            case 'favorites': return <FavoritesPage navigateTo={navigateTo} />;
            case 'settings': return <SettingsPage navigateTo={navigateTo} />; // Pass navigateTo for logout
            case 'cart': return <CartPage
                navigateTo={navigateTo}
                cart={cart}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                balance={balance}
                mode={mode}
            />;
            case 'store':
                // Fallback to login if no store data is available when navigating to store page
                return currentStore ? <StorePage
                    shopName={currentStore.shopName}
                    navigateTo={navigateTo}
                    addToCart={addToCart}
                /> : <LoginPage navigateTo={navigateTo} />;
            case 'summary': return <CheckoutSummaryPage navigateTo={navigateTo} orderDetails={currentOrderDetails} />;
            case 'receipt': return <ReceiptPage navigateTo={navigateTo} orderDetails={currentOrderDetails} />;
            case 'popular': return <PopularNearbyPage popularStores={popularStores} navigateTo={navigateTo} />;
            default:
                console.warn(`AppNavigator: Unknown page "${currentPage}", defaulting to login.`);
                return <LoginPage navigateTo={navigateTo} />; // Default to login for unknown pages
        }
    };

    return renderPage();
} 