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
import { confirmAlert } from "react-confirm-alert";
const ProductCatEdit = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/product");
  };
  const params = useParams();
  const [productlist, setproductlist] = useState([]);
  const [productcat, setproductcat] = useState([]);
  const [imgDefault, setimgDefault] = useState("../../noimage.png");
  const [photos, setphotos] = useState([]);
  const [updatePhoto, setupdatePhoto] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("files", acceptedFiles);
    },
  });

  const files = acceptedFiles.map((file, idx) => (
    <div key={idx} className="col-3 mb-3">
      <img className="img-fluid" src={URL.createObjectURL(file)} alt="" />
    </div>
  ));

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      id_list: 0,
      id_cat: 0,
      photo: "",
      description: "",
      content: "",
      price: "",
      files: [],
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
      ProductService.get(params.id).then((res) => {
        console.log(res.data);
        formik.setValues(res.data);
        if (res.data.id_list !== 0) {
          GetProductCat.list(res.data.id_list).then((res) => {
            setproductcat(res.data);
          });
        }
        if (res.data.photo !== "") {
          setimgDefault(res.data.photo);
        }
        setphotos(res.data.files);
      });
    }
    ProductListService.list().then((res) => {
      setproductlist(res.data);
    });
  }, [params.id]);

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      ProductService.add(data).then((res) => {
        if (res.data.errorCode === 0) {
          toast.success("Thêm mới thành công");
          navigate("/product");
        } else {
          toast.warning(res.data.message);
        }
      });
    } else {
      ProductService.update(data.id, data, "", "").then((res) => {
        if (res.data.errorCode === 0) {
          toast.success("Cập nhật thành công");
          navigate("/product");
        } else {
          toast.warning(res.data.message);
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
  const handleDelete = (e, id) => {
    //console.log(id);
    if (id) {
      ProductService.removeGallery(id).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Xoá hình thành công thành công");
          ProductService.get(params.id).then((res) => {
            if (res.data.photo !== "") {
              setimgDefault(res.data.photo);
            }
            setphotos(res.data.files);
          });
        } else {
          toast.warning(res.message);
        }
      });
    }
  };
  const confirmDelete = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: "Xác nhận xoá",
      message: "Bạn có chắc chắn muốn xoá",
      buttons: [
        {
          label: "Đồng ý",
          onClick: () => handleDelete(e, id),
        },
        {
          label: "Quay lại",
        },
      ],
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
                {formik.values.id === 0 ? "Thêm" : "Sửa"} sản phẩm
              </h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="id_list">Danh mục cấp 1</label>
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
                        placeholder="Nhập tên sản phẩm"
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
                        frmField={formik.getFieldProps("price")}
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

                    <section className="form-group">
                      <label>Album hình</label>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Chọn nhiều hình ảnh để tải lên</p>
                      </div>
                      <aside className="mt-3">
                        <div className="row">{files}</div>
                      </aside>
                      <aside className="mt-3">
                        <label>Album hình hiện tại</label>
                        <div className="row">
                          {photos.map((photo, idx) => (
                            <div key={idx} className="col-3 mb-3 item_gallery">
                              <div
                                className="delete mb-1"
                                onClick={(e) => confirmDelete(e, photo.id)}
                              >
                                <i className="fas fa-trash-alt"></i> Xoá
                              </div>
                              <img
                                className="img-fluid"
                                src={photo.photo}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
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
