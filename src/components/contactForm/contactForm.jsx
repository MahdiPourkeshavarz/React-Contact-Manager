/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
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
      id: data?.id || crypto.randomUUID(),
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "نام باید حداقل سه حرف باشد")
        .required("نام  الزامی است."),
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
      className="grid grid-cols-1 w-[430px] h-max mx-auto"
    >
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="نام"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-right"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
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
          className="text-right"
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
          className="text-right"
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
          className="text-right"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <button type="submit">ذخیره</button>
    </form>
  );
}
