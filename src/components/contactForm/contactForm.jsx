/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import { ContactContext } from "../../contactContext";

export function ContactForm() {
  const { submitHandler, person, formik } = useContext(ContactContext);

  useEffect(() => {
    formik.setValues({
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber,
      relation: person.relation,
      email: person.email,
      id: person.id
    });
  }, [person]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 w-1/2 h-max mx-auto p-4 gap-y-4 border rounded-2xl"
    >
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="نام"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right w-full focus:outline-none focus:border-2 focus:border-blue-300 h-10 border-2 border-blue-100 rounded-2xl pr-4 placeholder:text-slate-500"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-900 text-right pr-4">
            {formik.errors.firstName}
          </div>
        ) : null}
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="نام خوانوادگی"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right w-full focus:outline-none focus:border-2 focus:border-blue-300 h-10 border-2 border-blue-100 rounded-2xl pr-4 placeholder:text-slate-500"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div>
        <input
          type="text"
          name="phoneNumber"
          placeholder="شماره تماس"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right w-full focus:outline-none focus:border-2 focus:border-blue-300 h-10 border-2 border-blue-100 rounded-2xl pr-4 placeholder:text-slate-500"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
      <div>
        <select
          name="relation"
          value={formik.values.relation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right w-full focus:outline-none focus:border-2 focus:border-blue-300 h-10 border-2 border-blue-100 rounded-2xl pr-4 placeholder:text-slate-500"
        >
          <option value="" label="نسبت" />
          <option value="اعضای خانواده" label="اعضای خانواده" />
          <option value="دوست" label="دوست" />
          <option value="همکار" label="همکار" />
          <option value="فامیل" label="فامیل" />
        </select>
        {formik.touched.relation && formik.errors.relation ? (
          <div>{formik.errors.relation}</div>
        ) : null}
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right w-full focus:outline-none focus:border-2 focus:border-blue-300 h-10 border-2 border-blue-100 rounded-2xl pr-4 placeholder:text-slate-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 transition"
      >
        ذخیره
      </button>
    </form>
  );
}
