import React from 'react';
import ViewProduct from '../sub-Routes/Product/ViewProduct';
const ProductManage = () => {

  return (
    <div className=" h-screen">
      {/* <div className="bg-gray-800 text-white">
        <Sidebar />
      </div> */}
      <div className="flex flex-col">
        <div>
          <AdminNavbar />
        </div>
        <div className="p-4 bg-gray-200 mt-4 m-5 rounded-lg shadow-md">
          <ViewProduct />
        </div>
       </div>
    </div>
  );
};

export default ProductManage;
