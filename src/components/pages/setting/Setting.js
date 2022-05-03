import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import SettingService from "./../../../services/SettingService";
import Input from "./../../Input";

const Setting = () => {
  const navigate = useNavigate();

  const params = useParams();
  const loadata = () => {
    SettingService.get(1).then((res) => {
      formik.setValues(res.data);
    });
  };
  useEffect(() => {
    if (params.id > 0) {
      loadata();
    }
  }, [params.id]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      hotline: "",
      email: "",
      website: "",
      address: "",
      copyright: "",
      title: "",
      keywords: "",
      description: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("Bắt buộc nhập"),
      hotline: Yup.number()
        .typeError("Không phải số")
        .required("Bắt buộc nhập"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (data) => {
    SettingService.update(data.id, data, "", "").then((res) => {
      if (res.errorCode === 0) {
        toast.success("Cập nhật thành công");
        loadata();
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
                <h1 className="m-0">Quản lý cấu hình</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Cấu hình website</li>
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
              <h3 className="card-title">Cấu hình website</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Tên website</label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nhập tên website"
                        autoComplete="off"
                        frmField={formik.getFieldProps("name")}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Hotline</label>
                      <Input
                        id="hotline"
                        type="text"
                        placeholder="Nhập Hotline"
                        autoComplete="off"
                        frmField={formik.getFieldProps("hotline")}
                        err={formik.touched.hotline && formik.errors.hotline}
                        errMessage={formik.errors.hotline}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        type="text"
                        placeholder="Nhập Email"
                        autoComplete="off"
                        frmField={formik.getFieldProps("email")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Website</label>
                      <Input
                        id="website"
                        type="text"
                        placeholder="Nhập Website"
                        autoComplete="off"
                        frmField={formik.getFieldProps("website")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="copyright">Copyright</label>
                      <Input
                        id="copyright"
                        type="text"
                        placeholder="Nhập copyright"
                        autoComplete="off"
                        frmField={formik.getFieldProps("copyright")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Title</label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Nhập title"
                        autoComplete="off"
                        frmField={formik.getFieldProps("title")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="name">Address</label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Nhập address"
                        autoComplete="off"
                        frmField={formik.getFieldProps("address")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="keywords">Keywords</label>
                      <Input
                        id="keywords"
                        type="text"
                        placeholder="Nhập keywords"
                        autoComplete="off"
                        rows="4"
                        frmField={formik.getFieldProps("keywords")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <Input
                        id="description"
                        type="text"
                        placeholder="Nhập description"
                        autoComplete="off"
                        rows="4"
                        frmField={formik.getFieldProps("description")}
                        err={
                          formik.touched.description &&
                          formik.errors.description
                        }
                        errMessage={formik.errors.description}
                      ></Input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Lưu lại
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

export default Setting;
