import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth pages:
import LoginPage from './AuthScreen/Login';
import SigninPage from './AuthScreen/Signin';
import ForgetpasswordPage from './AuthScreen/Forgetpassword';

// User Pages:
import EyeTestingPage from './User/EyeTestScreen/EyeTesting';
import HomePage from './User/Routes/Home';
import FindStorePage from './User/Routes/FindStore';
import ShippingPage from './User/Routes/Shipping';
import AboutUsPage from './User/Routes/AboutUs';
import BlogPage from './User/Routes/Blog';
import PoliciesPage from './User/Routes/OurPolicies';
import Term_ConditionPage from './User/Routes/Term_Condition';
import SpecialOfferPage from './User/Routes/SpecialOffer';
import ContactUsPage from './User/Routes/ContactUs';
import AllProduct from './User/Routes/AllProduct';

// Admin Pages:
import Dashboard from './Admin/routes/Dashboard';
import CutomerManage from './Admin/routes/CutomerManage';
import InventoryManage from './Admin/routes/inventoryManage';
import ManageOrder from './Admin/routes/manageOrder';
import GenerateInvoice from './Admin/routes/GenerateInvoice';

// sub routes : 
// import AddCustomer from './Admin/sub-Routes/Customer/AddCustomer';
// import ViewCustomer from './Admin/sub-Routes/Customer/ViewCustomer';
// import AddInventory from './Admin/sub-Routes/Inventory/AddInventory';
// import ViewInventory from './Admin/sub-Routes/Inventory/ViewInventory';
// import AddOrder from './Admin/sub-Routes/Order/AddOrder';
// import ViewOrder from './Admin/sub-Routes/Order/ViewOrder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {/* <Route path="/" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forget-password" element={<ForgetpasswordPage />} /> */}

        {/* User Routes */}
        {/* <Route path="/home" element={<HomePage />} />
        <Route path="/eye-testing" element={<EyeTestingPage />} />
        <Route path="/find-store" element={<FindStorePage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/our-policies" element={<PoliciesPage />} />
        <Route path="/term-and-condition" element={<Term_ConditionPage />} />
        <Route path="/special-offer" element={<SpecialOfferPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/:category" element={<AllProduct />} /> */}
        

        {/* Admin Routes */}

        <Route path='/' element={<Dashboard />} />
        <Route path='/admin/orders' element={<ManageOrder />} />
        <Route path='/admin/customers' element={<CutomerManage />} />
        <Route path='/admin/inventory' element={<InventoryManage />} />
        <Route path='/admin/invoice' element={<GenerateInvoice />} />

        {/* sub routes */}

         {/* <Route path='/admin/customers/add' element={<AddCustomer />} /> */}
         {/* <Route path='/admin/customers/view' element={<ViewCustomer />} /> */}

         {/* <Route path='/admin/inventory/view' element={<AddInventory />} /> */}
         {/* <Route path='/admin/inventory/add' element={<ViewInventory />} /> */}

         {/* <Route path='/admin/orders/view'element={<AddOrder />} /> */}
         {/* <Route path='/admin/orders/add' element={<ViewOrder />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
