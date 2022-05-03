import React, { useEffect, useState } from "react";
import api from "./../../services/api";
import Photo from "./photo/Photo";
import { Link } from "react-router-dom";
const Home = () => {
  const [productnew, setproductnew] = useState([]);
  const loadData = () => {
    api.get("/Frontend/productnews/paging?page=0&pageLength=8").then((res) => {
      if (res.data.errorCode === 0) {
        setproductnew(res.data.data);
      }
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Chào mừng đến với trang quản trị</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Bảng điểu khiển</li>
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title">Sản phẩm bán chạy</h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-striped table-valign-middle">
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Chi tiết</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productnew.map((product, idx) => (
                          <tr>
                            <td>
                              <img
                                src={
                                  product.photo
                                    ? product.photo
                                    : "dist/img/default-150x150.png"
                                }
                                alt="Product 1"
                                className="img-circle img-size-32 mr-2"
                              />
                              {product.name}
                            </td>
                            <td>{product.price} VNĐ</td>
                            <td>
                              <small className="text-success mr-1">
                                <i className="fas fa-arrow-up" />
                                12
                              </small>
                            </td>
                            <td>
                              <Link to={`/product/${product.id}`}>
                                <i className="fas fa-search" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* /.card */}
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
};

export default Home;
