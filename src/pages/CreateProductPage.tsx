import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch} from "react-redux";
import { addProduct } from "../store/productSlice";
import { useNavigate } from "react-router-dom";

const CreateProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.string().url("Must be a valid URL").required("Image is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        addProduct({
          id: Date.now(),
          title: values.title,
          price: parseFloat(values.price),
          description: values.description,
          image: values.image,
        })
      );
      navigate("/products");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            className={`w-full p-2 border rounded ${
              formik.errors.title && formik.touched.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.price}
            className={`w-full p-2 border rounded ${
              formik.errors.price && formik.touched.price
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.errors.price && formik.touched.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className={`w-full p-2 border rounded ${
              formik.errors.description && formik.touched.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image}
            className={`w-full p-2 border rounded ${
              formik.errors.image && formik.touched.image
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
