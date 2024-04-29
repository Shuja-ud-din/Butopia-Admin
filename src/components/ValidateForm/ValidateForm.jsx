import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().
        min(2, "Too Short !")
        .max(50, "Too Long")
        .requires("Required"),
    secondName: Yup.string().
        min.string(2, "To Short!").
        max(50, "Too Long!").
        required("Required"),
    email: Yup.string().
        email("Invalid Email").
        required("Required")
})

export const ValidationSchemaExample = () => (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                firstName: "",
                secondName: "",
                email: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={
                values => {
                    // same shape as initial values
                    console.log(values);
                }
            }
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                    <Field name="second" />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
)