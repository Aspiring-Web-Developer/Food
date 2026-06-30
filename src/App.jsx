

import { Routes, Route } from "react-router-dom";

// Customer
import MainLayout     from "./layouts/MainLayout";
import Home           from "./Customer Pages/Home";
import Products       from "./Customer Pages/Product";
import Social         from "./Customer Pages/Social";
import Cart           from "./Customer Pages/Cart";
import ProductDetails from "./Customer Pages/ProductDetails";
import { PaymentPanel }   from "./Customer Pages/Payment";
import OrderStatus    from "./Customer Pages/Orderstatus";
import { CheckoutModal }  from "./Customer Pages/Checkout";
import OrderList      from "./Customer Pages/OrderList";
import ScrollToTop    from "./components/ScrollToTop";
import PrivacyPolicy   from "./Customer Pages/PrivacyPolicy";
import TermsCondition  from "./Customer Pages/TermsCondition";


// Admin
import AdminLayout      from "./AdminPanel/Adminlayout";
import AdminGuard       from "./AdminPanel/AdminGuard";
import AdminLoginPage   from "./AdminPanel/AdminLoginPage";
import AdminProducts    from "./AdminPanel/AdminProducts";
import AdminOrders      from "./AdminPanel/AdminOrders";

const AdminDashboard = () => <div style={{ fontSize: 24, fontWeight: 700 }}>Dashboard</div>;
const AdminCustomers = () => <div style={{ fontSize: 24, fontWeight: 700 }}>Customers</div>;
const AdminAnalytics = () => <div style={{ fontSize: 24, fontWeight: 700 }}>Analytics</div>;
const AdminSettings  = () => <div style={{ fontSize: 24, fontWeight: 700 }}>Settings</div>;

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* Customer routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<><Home /><Products /><Social /></>} />
          <Route path="/cart"        element={<Cart />} />
          <Route path="/payment"     element={<PaymentPanel />} />
          <Route path="/orders"      element={<OrderList />} />
          <Route path="/orders/:id"  element={<OrderStatus />} />
          <Route path="/checkout"    element={<CheckoutModal />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-condition" element={<TermsCondition />} />
        </Route>

        {/* Admin login — public */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin protected routes */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index            element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders"    element={<AdminOrders />} />
            <Route path="products"  element={<AdminProducts />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings"  element={<AdminSettings />} />
          </Route>
        </Route>

      </Routes>
    </>
  );
}