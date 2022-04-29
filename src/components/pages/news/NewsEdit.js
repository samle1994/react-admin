import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import NewsService from "./../../../services/NewsService";
import Input from "./../../Input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const NewsEdit = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/news");
  };
  const params = useParams();
  const [imgDefault, setimgDefault] = useState("../../noimage.png");

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      photo: "",
      description: "",
      content: "",
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
      NewsService.get(params.id).then((res) => {
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
      NewsService.add(data).then((res) => {
        if (res.data.errorCode === 0) {
          toast.success("Thêm mới thành công");
          navigate("/news");
        } else {
          toast.warning(res.data.message);
        }
      });
    } else {
      NewsService.update(data.id, data, "", "").then((res) => {
        if (res.data.errorCode === 0) {
          toast.success("Cập nhật thành công");
          navigate("/news");
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
                <h1 className="m-0">Quản lý tin tức</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Danh sách tin tức</li>
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
                {formik.values.id === 0 ? "Thêm" : "Sửa"} tin tức
              </h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Tiêu đề</label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nhập tên bài viết"
                        autoComplete="off"
                        frmField={formik.getFieldProps("name")}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                      ></Input>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Mô tả</label>
                      <Input
                        id="description"
                        type="text"
                        placeholder="Nhập mô tả"
                        rows="5"
                        frmField={formik.getFieldProps("description")}
                      ></Input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nội dung</label>
                      <div>
                        <CKEditor
                          editor={ClassicEditor}
                          data={
                            formik.values.content ? formik.values.content : ""
                          }
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            formik.setFieldValue("content", data);
                          }}
                        />
                      </div>
                    </div>
                  </div>
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

export default NewsEdit;
