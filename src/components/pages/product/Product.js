import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import ProductService from "./../../../services/ProductService";
import { Pagination, Form } from "react-bootstrap";
const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let page_serch = location.search.split("?page=")[1];
  let page_default = 0;
  if (page_serch !== undefined) {
    page_default = Number(page_serch);
  }
  const [product, setproduct] = useState([]);
  const [page, setpage] = useState(page_default);
  const [pageLength, setpageLength] = useState(10);
  const [pagingItems, setpagingItems] = useState([]);
  const [search, setsearch] = useState("");
  const loadData = () => {
    ProductService.getPaging(page, pageLength, search).then((res) => {
      //console.log(res);
      if (res.data.data == "" && res.data.PageInfo.total > 0) {
        setpage(res.data.PageInfo.total - 1);
      }
      setproduct(res.data.data);
      let items = [
        <Pagination.Item key="first" onClick={() => setpage(0)}>
          &laquo;
        </Pagination.Item>,
      ];
      for (let i = 0; i < res.data.PageInfo.total; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => setpage(i)}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
      items.push(
        <Pagination.Item
          key="last"
          onClick={() => setpage(res.data.PageInfo.total - 1)}
        >
          &raquo;
        </Pagination.Item>
      );
      setpagingItems(items);
    });
  };

  useEffect(() => {
    loadData();
  }, [page, pageLength, search]);

  const handleAdd = (e, id = 0, page = 0) => {
    e.preventDefault();
    navigate("/product/" + id + "?page=" + page);
  };

  const handleDelete = (id) => {
    if (id) {
      ProductService.remove(id).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Xoá dữ liệu thành công");
          loadData();
        } else {
          toast.warning(res.message);
        }
      });
    }
  };

  const confirm = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: "Xác nhận xoá",
      message: "Bạn có chắc chắn muốn xoá",
      buttons: [
        {
          label: "Đồng ý",
          onClick: () => handleDelete(id),
        },
        {
          label: "Quay lại",
        },
      ],
    });
  };

  const handleSearch = (e) => {
    setsearch(e.target.value);
    //console.log(search);
  };
  const handleChangeStatus = (e, id) => {
    let value = e.target.checked === false ? 0 : 1;
    let type = e.target.name;
    ProductService.update(id, {}, value, type).then((res) => {
      //console.log(res);
      if (res.errorCode === 0) {
      } else {
        toast.warning(res.message);
      }
    });
  };

  const handleChangePage = (e) => {
    setpageLength(Number(e.target.value));
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
                <h1 className="m-0">Quản lý sản phẩm</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Danh sách sản phẩm</li>
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
                  autoComplete="off"
                  onChange={handleSearch}
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
                  <div className="d-flex align-items-center justify-content-between">
                    <h3 className="card-title">Danh sách sản phẩm</h3>
                    <div className="col-auto d-flex align-items-center">
                      <p className="mb-0 mr-1">Show</p>
                      <Form.Select
                        name="id_cat"
                        id="id_cat"
                        className="form-control"
                        aria-label="Chọn danh mục cấp 1"
                        value={pageLength}
                        onChange={handleChangePage}
                      >
                        <option key="1" value="10">
                          10
                        </option>
                        <option key="2" value="15">
                          15
                        </option>
                        <option key="3" value="20">
                          20
                        </option>
                      </Form.Select>
                      <p className="mb-0 ml-1">entries</p>
                    </div>
                  </div>
                </div>
                {/* ./card-header */}
                <div className="box-body table-responsive ">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="5%" className="align-middle text-center">
                          STT
                        </th>
                        <th width="14%" className="align-middle text-center">
                          Danh mục cấp 1
                        </th>
                        <th width="14%" className="align-middle text-center">
                          Danh mục cấp 2
                        </th>
                        <th width="5%" className="align-middle text-center">
                          Photo
                        </th>
                        <th width="20%" className="align-middle text-center">
                          Tiêu đề
                        </th>
                        <th width="8%" className="align-middle text-center">
                          Hiển thị
                        </th>
                        <th width="8%" className="align-middle text-center">
                          Nổi bật
                        </th>
                        <th width="8%" className="align-middle text-center">
                          Sale
                        </th>
                        <th width="8%" className="align-middle text-center">
                          News
                        </th>
                        <th width="10%" className="align-middle text-center">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((product, idx) => (
                        <tr
                          key={product.id}
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td className="align-middle text-center">
                            {idx + 1}
                          </td>
                          <td className="align-middle ">
                            <p
                              className="mb-0"
                              onClick={(e) => handleAdd(e, product.id, page)}
                            >
                              {product.product_list
                                ? product.product_list.name
                                : ""}
                            </p>
                          </td>
                          <td className="align-middle ">
                            <p
                              className="mb-0"
                              onClick={(e) => handleAdd(e, product.id, page)}
                            >
                              {product.product_cat
                                ? product.product_cat.name
                                : ""}
                            </p>
                          </td>
                          <td>
                            <img
                              width="50"
                              src={product.photo}
                              alt=""
                              onClick={(e) => handleAdd(e, product.id, page)}
                            />
                          </td>
                          <td className="align-middle ">
                            <p
                              className="mb-0"
                              onClick={(e) => handleAdd(e, product.id, page)}
                            >
                              {product.name}
                            </p>
                          </td>
                          <td className="align-middle text-center">
                            <div className="custom-control custom-checkbox my-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input show-checkbox"
                                id={`show-checkbox-${product.id}`}
                                defaultChecked={
                                  product.is_status == 1 ? true : false
                                }
                                onClick={(e) =>
                                  handleChangeStatus(e, product.id)
                                }
                                name="is_status"
                              />
                              <label
                                htmlFor={`show-checkbox-${product.id}`}
                                className="custom-control-label"
                              />
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <div className="custom-control custom-checkbox my-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input show-checkbox"
                                id={`show-checkbox-hot-${product.id}`}
                                defaultChecked={product.hot == 1 ? true : false}
                                onClick={(e) =>
                                  handleChangeStatus(e, product.id)
                                }
                                name="hot"
                              />
                              <label
                                htmlFor={`show-checkbox-hot-${product.id}`}
                                className="custom-control-label"
                              />
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <div className="custom-control custom-checkbox my-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input show-checkbox"
                                id={`show-checkbox-news-${product.id}`}
                                defaultChecked={
                                  product.news == 1 ? true : false
                                }
                                onClick={(e) =>
                                  handleChangeStatus(e, product.id)
                                }
                                name="news"
                              />
                              <label
                                htmlFor={`show-checkbox-news-${product.id}`}
                                className="custom-control-label"
                              />
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <div className="custom-control custom-checkbox my-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input show-checkbox"
                                id={`show-checkbox-sale-${product.id}`}
                                defaultChecked={
                                  product.sale == 1 ? true : false
                                }
                                onClick={(e) =>
                                  handleChangeStatus(e, product.id)
                                }
                                name="sale"
                              />
                              <label
                                htmlFor={`show-checkbox-sale-${product.id}`}
                                className="custom-control-label"
                              />
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            <div>
                              <a
                                className="text-primary mr-2"
                                href="/#"
                                onClick={(e) => handleAdd(e, product.id, page)}
                                title="Chỉnh sửa"
                              >
                                <i className="fas fa-edit" />
                              </a>
                              <a
                                className="text-danger"
                                id="delete-item"
                                href="/#"
                                onClick={(e) => confirm(e, product.id)}
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
                  <Pagination className="mt-3 mb-0 justify-content-end">
                    {pagingItems}
                  </Pagination>
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
