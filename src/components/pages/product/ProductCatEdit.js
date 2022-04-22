import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductCatService from "./../../../services/ProductCatService";
import Input from "./../../Input";
import ProductListService from "./../../../services/ProductListService";

const ProductCatEdit = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/productcat");
  };
  const params = useParams();
  const [productlist, setproductlist] = useState([]);

  useEffect(() => {
    if (params.id > 0) {
      ProductCatService.get(params.id).then((res) => {
        formik.setValues(res.data);
      });
    }
    ProductListService.list().then((res) => {
      setproductlist(res.data);
    });
  }, [params.id]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      id_list: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("Bắt buộc nhập"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      ProductCatService.add(data).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Thêm mới thành công");
          navigate("/productcat");
        } else {
          toast.warning(res.message);
        }
      });
    } else {
      ProductCatService.update(data.id, data, "", "").then((res) => {
        if (res.errorCode === 0) {
          toast.success("Cập nhật thành công");
          navigate("/productcat");
        } else {
          toast.warning(res.message);
        }
      });
    }
  };

  const handleChangeSelect = (e) => {
    formik.setFieldValue("id_list", Number(e.target.value).valueOf());
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
                <h1 className="m-0">Quản lý sản phẩm cấp 2</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Danh mục cấp 2</li>
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
              <h3 className="card-title">
                {formik.id == 0 ? "Thêm" : "Sửa"} danh mục
              </h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Danh mục cấp 1</label>
                  <Form.Select
                    name="id_list"
                    id="id_list"
                    className="form-control"
                    aria-label="Chọn danh mục cấp 1"
                    onChange={handleChangeSelect}
                    value={formik.values.id_list}
                  >
                    <option key="1" value="0">
                      Chọn danh mục 1
                    </option>
                    {productlist.map((list, index) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tiêu đề</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên danh mục"
                    autoComplete="off"
                    frmField={formik.getFieldProps("name")}
                    err={formik.touched.name && formik.errors.name}
                    errMessage={formik.errors.name}
                  ></Input>
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

export default ProductCatEdit;
