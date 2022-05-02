import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./../../Input";
import PhotosService from "./../../../services/PhotosService";
const PhotosEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  let type = params.type;
  const handleBack = () => {
    navigate("/photos/" + type);
  };

  const [imgDefault, setimgDefault] = useState("../../noimage.png");

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      link: "",
      photo: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("Bắt buộc nhập"),
    }),
    onSubmit: (values) => {
      //console.log(values);
      handleFormSubmit(values);
    },
  });
  useEffect(() => {
    if (params.id > 0) {
      PhotosService.get(params.id).then((res) => {
        console.log(res.data);
        formik.setValues(res.data);
        if (res.data.photo !== "") {
          setimgDefault(res.data.photo);
        }
      });
    }
  }, [params.id]);

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      PhotosService.add(data, type).then((res) => {
        if (res.data.errorCode === 0) {
          toast.success("Thêm mới thành công");
          navigate("/photos/" + type);
        } else {
          toast.warning(res.data.message);
        }
      });
    } else {
      PhotosService.update(data.id, data, "", "").then((res) => {
        if (res.data.errorCode === 0) {
          toast.success("Cập nhật thành công");
          navigate("/photos/" + type);
        } else {
          toast.warning(res.data.message);
        }
      });
    }
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
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">
                {formik.values.id === 0 ? "Thêm" : "Sửa"} hình ảnh
              </h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Tiêu đề</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên hình ảnh"
                    autoComplete="off"
                    frmField={formik.getFieldProps("name")}
                    err={formik.touched.name && formik.errors.name}
                    errMessage={formik.errors.name}
                  ></Input>
                </div>

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

export default PhotosEdit;
