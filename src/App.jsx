import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage/HomePage"
import AffiliateRegister from "./pages/Affiliate/AffiliateRegister/AffiliateRegister"
import BaseLayout from "./layout/BaseLayout"
import DashboardLayout from "./layout/DashboardLayout"
import AffiliateLogin from "./pages/Affiliate/AffiliateLogin/AffiliateLogin"
import RoleBasedPrivateRoute from "./components/Shared/RoleBasedPrivateRoute"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"
import { Loader } from "./components/Shared/Loader"
import Dashboard from "./pages/Affiliate/AffiliateDashboard/Dashboard"
import CustomerPreBooking from "./pages/CustomerPreBooking/CustomerPreBooking"
import PrebookingPaymentSuccess from "./pages/CustomerPreBooking/PrebookingPaymentSuccess"
import PrebookingPaymentDeclined from "./pages/CustomerPreBooking/PrebookingPaymentDeclined"
import DashboardQrPreview from "./pages/Affiliate/AffiliateDashboard/DashboardQrPreview"


const queryClient = new QueryClient()

function App() {




  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>

          <Route path="/" element={<BaseLayout />}>

            <Route index element={<HomePage />} />

          </Route>

          <Route path="/auth" >
            <Route path="affiliate/register" element={<AffiliateRegister />} />
            <Route path="affiliate/login" element={<AffiliateLogin />} />

          </Route>

          <Route path="/affiliate" element={
            <RoleBasedPrivateRoute requiredRole="affiliate">
              <DashboardLayout />
            </RoleBasedPrivateRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/qr-preview" element={<DashboardQrPreview />} />
            <Route path="affiliates" element={<h1>Affiliate Links</h1>} />
            <Route path="stats" element={<h1>Affiliate Stats</h1>} />

          </Route>

          {/* affiliate payment link */}
          <Route path="/customer/:affiliateId" element={<CustomerPreBooking />} />
          <Route path="/prebooking/payment/success" element={<PrebookingPaymentSuccess />} />
          <Route path="/prebooking/payment/fail" element={<PrebookingPaymentDeclined />} />

          <Route path="/customer" element={
            <RoleBasedPrivateRoute requiredRole="customer">
              <DashboardLayout />
            </RoleBasedPrivateRoute>
          }>
            <Route path="dashboard" element={<h1>Customer Dashboard</h1>} />
            <Route path="orders" element={<h1>Customer Orders</h1>} />
          </Route>


          {/* Admin Routes */}
          {/* <Route path="/admin" element={<PrivateRoute requiredRole="admin"><DashboardLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
          <Route path="users" element={<h1>Manage Users</h1>} />
        </Route> */}

          {/* Customer Routes */}
          {/* <Route path="/customer" element={<PrivateRoute requiredRole="customer"><DashboardLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<h1>Customer Dashboard</h1>} />
          <Route path="orders" element={<h1>Customer Orders</h1>} />
        </Route> */}


        </Routes>
        <Toaster position="top-right" />

        <Loader />

      </QueryClientProvider>

    </>
  )
}

export default App
