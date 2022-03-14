import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createUser } from "api/users";

export default () => {
  const navigate = useNavigate();
  const [addUser, { isPending }] = createUser({
    lazy: true,
    onCompleted: () => navigate("/users"),
  });
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => addUser({ data: values }),
  });

  useEffect(() => {
    formik.setFieldValue(
      "name",
      [formik.values.firstName, formik.values.lastName].join(" ").trim()
    );
  }, [formik.values.firstName, formik.values.lastName]);

  if (isPending) return "Creating Trip...,";
  return (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column border p-5 shadow bg-primary text-white"
      >
        <div className="d-flex justify-content-between p-2">
          <label htmlFor="firstName" className="mx-1">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            defaultValue={formik.values.firstName}
          />
        </div>
        <div className="d-flex justify-content-between p-2">
          <label htmlFor="lastName" className="mx-1">
            LastName
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            defaultValue={formik.values.lastName}
          />
        </div>
        <div className="d-flex justify-content-between p-2">
          <label htmlFor="name" className="mx-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={formik.values.name}
            disabled
          />
        </div>
        <div className="d-flex justify-content-between p-2">
          <label htmlFor="description" className="mx-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            defaultValue={formik.values.email}
          />
        </div>
        <button type="submit" className="m-2" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
