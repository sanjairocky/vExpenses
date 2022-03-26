import React from "react";
import { useFormik } from "formik";
import { createTrip } from "api/trips";
import { getUsers } from "api/users";
import createTripSchema from "schemas/createTripSchema";
import { useNavigate } from "react-router-dom";
import Select from "components/Select";
import { useUser } from "context/app";

export default () => {
  const navigate = useNavigate();
  const [user] = useUser();
  const [addTrip, { isPending }] = createTrip({
    lazy: true,
    onCompleted: () => navigate("/"),
  });
  const { data: users } = getUsers();
  const formik = useFormik({
    validationSchema: createTripSchema,
    initialValues: {
      users: [{ label: user?.name, value: user?.email, isFixed: true }],
    },
    onSubmit: ({ users, ...values }) =>
      addTrip({ data: { ...values, users: users.map(({ value }) => value) } }),
    validateOnMount: true,
  });
  window.formik = formik;

  if (isPending) return "Creating Trip...,";
  return (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column justify-content-around border px-5 py-2 h-75  rounded shadow"
      >
        <h5 className="align-self-center text-primary">Create Trip</h5>
        <div className="d-flex flex-column justify-content-between p-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder=" Title"
            className="p-2 mb-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.title}
          />

          <input
            id="description"
            name="description"
            type="text"
            className="p-2 mb-3"
            placeholder="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.description}
          />
          <Select
            name="users"
            options={(users || [])
              .filter(({ email }) => email !== user?.email)
              .map((u) => ({
                label: u.name,
                value: u.email,
              }))}
            formik={formik}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
