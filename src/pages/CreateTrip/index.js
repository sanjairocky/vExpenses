import React from "react";
import { useFormik } from "formik";
import { createTrip } from "api/trips";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [addTrip, { isPending }] = createTrip({
    lazy: true,
    onCompleted: () => navigate("/"),
  });
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => addTrip({ body: values }),
  });

  if (isPending) return "Creating Trip...,";
  return (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column border p-5 shadow bg-primary text-white"
      >
        <div className="d-flex justify-content-between p-2">
          <label htmlFor="title" className="mx-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            defaultValue={formik.values.title}
          />
        </div>
        <div className="d-flex justify-content-between p-2">
          <label htmlFor="description" className="mx-1">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            defaultValue={formik.values.description}
          />
        </div>
        <button type="submit" className="m-2">
          Submit
        </button>
      </form>
    </div>
  );
};
