import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "./../../../services/ProductService";
import Input from "./../../Input";
import ProductListService from "./../../../services/ProductListService";
import ProductCatService from "./../../../services/ProductCatService";
import GetProductCat from "./../../../services/GetProductCatService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Dropzone, { useDropzone } from "react-dropzone";
const ProductCatEdit = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/product");
  };
  const params = useParams();
  const [productlist, setproductlist] = useState([]);
  const [productcat, setproductcat] = useState([]);
  const [imgDefault, setimgDefault] = useState("../../noimage.png");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("files", acceptedFiles);
    },
  });

  const files = acceptedFiles.map((file) => (
    <div class="col-3">
      <img class="img-fluid" src={URL.createObjectURL(file)} alt="" />
    </div>
  ));

  useEffect(() => {
    if (params.id > 0) {
      ProductService.get(params.id).then((res) => {
        //console.log(res);
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
      name: "",
      id_list: 0,
      id_cat: 0,
      photo: "",
      description: "",
      content: "",
      price: 0,
      files: [],
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("Bắt buộc nhập"),
    }),
    onSubmit: (values) => {
      console.log(values);
      //handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      ProductService.add(data).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Thêm mới thành công");
          navigate("/product");
        } else {
          toast.warning(res.message);
        }
      });
    } else {
      ProductService.update(data.id, data, "", "").then((res) => {
        if (res.errorCode === 0) {
          toast.success("Cập nhật thành công");
          navigate("/product");
        } else {
          toast.warning(res.message);
        }
      });
    }
  };

  const handleChangeSelect = (e) => {
    formik.setFieldValue("id_list", Number(e.target.value).valueOf());
    GetProductCat.list(Number(e.target.value).valueOf()).then((res) => {
      setproductcat(res.data);
    });
  };
  const handleChangeSelectCat = (e) => {
    formik.setFieldValue("id_cat", Number(e.target.value).valueOf());
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
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">
                {formik.id == 0 ? "Thêm" : "Sửa"} sản phẩm
              </h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="id_list">Danh sách sản phẩm</label>
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
                      <label htmlFor="id_cat">Danh mục cấp 2</label>
                      <Form.Select
                        name="id_cat"
                        id="id_cat"
                        className="form-control"
                        aria-label="Chọn danh mục cấp 1"
                        onChange={handleChangeSelectCat}
                        value={formik.values.id_cat}
                      >
                        <option key="1" value="0">
                          Chọn danh mục 2
                        </option>
                        {productcat.map((cat, index) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Tiêu đề</label>
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
                    <div className="form-group">
                      <label htmlFor="price">Giá</label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Nhập giá"
                        autoComplete="off"
                      ></Input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Mô tả</label>
                      <Input
                        id="description"
                        type="text"
                        placeholder="Nhập mô tả"
                        rows="5"
                      ></Input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nội dung</label>
                      <div>
                        <CKEditor
                          editor={ClassicEditor}
                          data=""
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

                    <section className="form-group">
                      <label>Album hình</label>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Chọn nhiều hình ảnh để tải lên</p>
                      </div>
                      <aside className="mt-3">
                        <div class="row">{files}</div>
                      </aside>
                    </section>
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

export default ProductCatEdit;
