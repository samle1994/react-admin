import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhotoService from "./../../../services/PhotoService";
import Input from "./../../Input";

const Photo = () => {
  const navigate = useNavigate();
  const [imgDefault, setimgDefault] = useState("../../noimage.png");

  const params = useParams();
  const loadata = () => {
    PhotoService.get(params.type).then((res) => {
      if (res.errorCode === 0) {
        formik.setValues(res.data);
        setimgDefault(res.data.photo);
      } else {
        formik.setFieldValue("link", "");
        setimgDefault("../../noimage.png");
      }
    });
  };
  useEffect(() => {
    if (params.type !== "") {
      loadata();
    }
  }, [params.type]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      photo: "",
      link: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      //console.log(values);
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (data) => {
    PhotoService.update(params.type, data).then((res) => {
      console.log(res);
      if (res.data.errorCode === 0) {
        toast.success("Cập nhật thành công");
        loadata();
      } else {
        toast.warning(res.data.message);
      }
    });
  };

  const handleChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      setimgDefault(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue("photo", e.target.files[0]);
    }
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
                  <li className="breadcrumb-item active">{params.type}</li>
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
              <h3 className="card-title">Quản lý {params.type}</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="name">Hình ảnh</label>
                      <div className="mt-2">
                        <div className="mb-3 img-detail">
                          <img className="img-fluid" src={imgDefault} alt="" />
                        </div>
                        <label
                          className="photoUpload-file"
                          id="photo-zone"
                          htmlFor="file-zone"
                        >
                          <input
                            className="d-none"
                            type="file"
                            name="file"
                            id="file-zone"
                            onChange={handleChangeImg}
                          />
                          <p className="photoUpload-choose btn btn-sm bg-gradient-success">
                            Chọn hình
                          </p>
                        </label>
                      </div>
                    </div>
                    {params.type === "bannerseller" ||
                    params.type === "bannersaleoff" ||
                    params.type === "bannerqc" ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="name">Link</label>
                          <Input
                            id="link"
                            type="text"
                            placeholder="Nhập link"
                            autoComplete="off"
                            frmField={formik.getFieldProps("link")}
                            err={formik.touched.link && formik.errors.link}
                            errMessage={formik.errors.link}
                          ></Input>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
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

export default Photo;
