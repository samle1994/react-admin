import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import PhotosService from "./../../../services/PhotosService";
import { Pagination } from "react-bootstrap";

const Photos = () => {
  const params = useParams();
  const navigate = useNavigate();

  let type = params.type;

  const handleAdd = (e, id = 0) => {
    e.preventDefault();
    navigate("/photos/" + type + "/" + id);
  };

  const [news, setnews] = useState([]);
  const [page, setpage] = useState(0);
  const [pageLength, setpageLength] = useState(10);
  const [pagingItems, setpagingItems] = useState([]);
  const [search, setsearch] = useState("");

  const loadData = (type) => {
    PhotosService.getPaging(page, pageLength, search, type).then((res) => {
      console.log(res);
      if (res.data.data == "" && res.data.PageInfo.total > 0) {
        setpage(res.data.PageInfo.total - 1);
      }
      setnews(res.data.data);
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
    loadData(params.type);
  }, [page, pageLength, search, params.type]);

  const handleDelete = (id) => {
    if (id) {
      PhotosService.remove(id).then((res) => {
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
    PhotosService.update(id, {}, value, type).then((res) => {
      console.log(res);
      if (res.errorCode === 0) {
      } else {
        toast.warning(res.message);
      }
    });
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
                <h1 className="m-0">Quản lý hình ảnh</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Danh sách hình ảnh</li>
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
              onClick={(e) => handleAdd(e, news.id)}
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
                  <h3 className="card-title">Danh sách hình ảnh</h3>
                </div>
                {/* ./card-header */}
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="5%" className="align-middle text-center">
                          STT
                        </th>

                        <th width="10%" className="align-middle text-center">
                          Photo
                        </th>
                        <th width="50%" className="align-middle text-center">
                          Tiêu đề
                        </th>
                        <th width="15%" className="align-middle text-center">
                          Hiển thị
                        </th>

                        <th width="15%" className="align-middle text-center">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.map((news, idx) => (
                        <tr
                          key={news.id}
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td className="align-middle text-center">
                            {idx + 1}
                          </td>

                          <td>
                            <img
                              onClick={(e) => handleAdd(e, news.id)}
                              style={{ maxWidth: "50px" }}
                              src={news.photo}
                              alt=""
                            />
                          </td>
                          <td className="align-middle ">
                            <p
                              className="mb-0"
                              onClick={(e) => handleAdd(e, news.id)}
                            >
                              {news.name}
                            </p>
                          </td>
                          <td className="align-middle text-center">
                            <div className="custom-control custom-checkbox my-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input show-checkbox"
                                id={`show-checkbox-${news.id}`}
                                defaultChecked={
                                  news.is_status == 1 ? true : false
                                }
                                onClick={(e) => handleChangeStatus(e, news.id)}
                                name="is_status"
                              />
                              <label
                                htmlFor={`show-checkbox-${news.id}`}
                                className="custom-control-label"
                              />
                            </div>
                          </td>

                          <td className="align-middle text-center">
                            <div>
                              <a
                                className="text-primary mr-2"
                                href="/#"
                                onClick={(e) => handleAdd(e, news.id)}
                                title="Chỉnh sửa"
                              >
                                <i className="fas fa-edit" />
                              </a>
                              <a
                                className="text-danger"
                                id="delete-item"
                                href="/#"
                                onClick={(e) => confirm(e, news.id)}
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

export default Photos;
