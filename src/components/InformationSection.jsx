import React, { useState } from "react";
import ContactUs from "./ContactUs";

export default function InformationSection() {
  const [formData, setFormData] = useState([]); // Array to store contact data
  const [currentData, setCurrentData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: ""
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCurrentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setErrors({
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: ""
    });

    let isValid = true;
    const newErrors = {};

    if (!currentData.FirstName) {
      isValid = false;
      newErrors.FirstName = "First name is required";
    }
    if (!currentData.LastName) {
      isValid = false;
      newErrors.LastName = "Last name is required";
    }
    if (!currentData.Email) {
      isValid = false;
      newErrors.Email = "Email is required";
    } else if (!validateEmail(currentData.Email)) {
      isValid = false;
      newErrors.Email = "Invalid email format";
    }
    if (!currentData.Phone) {
      isValid = false;
      newErrors.Phone = "Phone number is required";
    } else if (currentData.Phone.length < 10) {
      isValid = false;
      newErrors.Phone = "Phone number must be at least 10 digits";
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Add new contact to the formData array
    setFormData((prevData) => [...prevData, currentData]);

    // Clear the current form fields after submission
    setCurrentData({
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: ""
    });
  };

  // Delete handler
  const deleteContact = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData); // Update the formData after deletion
  };

  return (
    <div className="flex flex-col items-center justify-center w-172 lg:w-200 xl:w-240 ">
      <h1 className="text-blue-700 mb-4 top-10 absolute">ارتباط با ما</h1>
      <h3 className="text-gray-700 mb-8 top-28 absolute">azolfagharir ساخته شده توسط </h3>
      <div className="w-full">
        <form className="flex flex-col col-2 shadow-xl/30" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-2 gap-4 m-4 mr-8 ml-8">
            <input
              type="text"
              name="FirstName"
              placeholder="نام"
              value={currentData.FirstName}
              onChange={onChangeHandler}
              className="p-2 border border-gray-300 rounded-2xl mr-4 w-full"
            />
            <input
              type="text"
              name="LastName"
              placeholder="نام خانوادگی"
              value={currentData.LastName}
              onChange={onChangeHandler}
              className="p-2 border border-gray-300 rounded-2xl w-full"
            />
            <input
              type="email"
              name="Email"
              placeholder="ایمیل"
              value={currentData.Email}
              onChange={onChangeHandler}
              className="p-2 border border-gray-300 rounded-2xl mr-4 w-full"
            />
            <input
              type="number"
              name="Phone"
              placeholder="تلفن"
              value={currentData.Phone}
              onChange={onChangeHandler}
              className="p-2 border border-gray-300 rounded-2xl w-full"
            />
          </div>
          <button
            type="submit"
            className="mt-4 mb-8 mx-8 text-white !rounded-2xl hover:!bg-blue-800 !bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        {errors.FirstName && <span className="text-red-500">{errors.FirstName}</span>}
        <br />
        {errors.LastName && <span className="text-red-500">{errors.LastName}</span>}
        <br />
        {errors.Email && <span className="text-red-500">{errors.Email}</span>}
        <br />
        {errors.Phone && <span className="text-red-500">{errors.Phone}</span>}
      </div>

      <div>
        {formData.map((data, index) => (
          <ContactUs
            key={index}
            name={data.FirstName}
            lastName={data.LastName}
            email={data.Email}
            phone={data.Phone}
            onDelete={() => deleteContact(index)} // Pass delete function to each ContactUs
          />
        ))}
      </div>
    </div>
  );
}
