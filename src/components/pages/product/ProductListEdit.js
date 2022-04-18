import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [data, setdata] = useState([]);
  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setdata(newData);
    console.log(data);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/product");
  };
  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Quản lý sản phẩm cấp 1</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Danh mục cấp 1</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <div className="content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Thêm sản phẩm</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tiêu đề</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tiêu đề 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name1"
                    name="name1"
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề"
                  />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Lưu lại
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={handleBack}
                >
                  Quay lại
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
};

export default ProductList;
