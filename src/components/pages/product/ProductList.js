import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductListService from "./../../../services/ProductListService";
const Product = () => {
  const navigate = useNavigate();
  const handleAdd = (e, id) => {
    e.preventDefault();
    navigate("/productlist/" + id);
  };

  const [productlist, setproductlist] = useState([]);

  const loadData = () => {
    ProductListService.list().then((res) => {
      setproductlist(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(productlist);

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
          <div className="card-footer text-sm sticky-top">
            <a
              className="btn btn-sm bg-gradient-primary text-white"
              href="/#"
              onClick={handleAdd}
              title="Thêm mới"
            >
              <i className="fas fa-plus mr-2" />
              Thêm mới
            </a>
            <div className="form-inline form-search d-inline-block align-middle ml-3">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar text-sm"
                  type="search"
                  id="keyword"
                  placeholder="Tìm kiếm"
                  aria-label="Tìm kiếm"
                  defaultValue=""
                />
                <div className="input-group-append bg-primary rounded-right">
                  <button className="btn btn-navbar text-white" type="button">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Danh sách cấp 1</h3>
                </div>
                {/* ./card-header */}
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="5%" className="align-middle text-center">
                          STT
                        </th>
                        <th width="40%" className="align-middle text-center">
                          Tiêu đề
                        </th>
                        <th width="10%" className="align-middle text-center">
                          Hiển thị
                        </th>
                        <th width="10%" className="align-middle text-center">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productlist.map((productlist, idx) => (
                        <tr
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td className="align-middle text-center">
                            {idx + 1}
                          </td>
                          <td className="align-middle ">{productlist.name}</td>
                          <td className="align-middle text-center">
                            <div className="custom-control custom-checkbox my-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input show-checkbox"
                                id={`show-checkbox-${productlist.id}`}
                                defaultChecked={
                                  productlist.is_status == 1 ? true : false
                                }
                              />
                              <label
                                htmlFor={`show-checkbox-${productlist.id}`}
                                className="custom-control-label"
                              />
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <div>
                              <a
                                className="text-primary mr-2"
                                href="/#"
                                onClick={(e) => handleAdd(e, productlist.id)}
                                title="Chỉnh sửa"
                              >
                                <i className="fas fa-edit" />
                              </a>
                              <a
                                className="text-danger"
                                id="delete-item"
                                href="/#"
                                title="Xóa"
                              >
                                <i className="fas fa-trash-alt" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
};

export default Product;
