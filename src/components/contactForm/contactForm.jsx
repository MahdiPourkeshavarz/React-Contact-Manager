/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export function ContactForm({ onSubmit, data }) {
  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phoneNumber: data?.phoneNumber || "",
      relation: data?.relation || "",
      email: data?.email || "",
      id: data?.id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "نام باید حداقل سه حرف باشد")
        .required("نام الزامی است."),
      lastName: Yup.string()
        .min(3, "نام خوانوادگی باید حداقل 3 حرف باشد")
        .required("نام خوانوادگی الزامی است"),
      phoneNumber: Yup.string()
        .matches(/^09[0-9]+$/, "شماره تماس باید فقط عدد باشد.")
        .min(11, "شماره تلفن باید ۱۱ رقم باشد.")
        .max(11, "شماره تلفن باید ۱۱ رقم باشد.")
        .required("شماره تلفن الزامیست"),
      relation: Yup.string().required("الزامی"),
      email: Yup.string()
        .email("ایمیل به صورت نادرست وارد شده است.")
        .required("ایمیل الزامی است."),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 w-[430px] h-max mx-auto p-1 bg-slate-50 gap-y-4"
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
