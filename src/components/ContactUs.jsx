import React from "react";

export default function ContactUs(props) {
  return (
  <div className="flex flex-col items-center justify-center mb-4">
  <div className="flex flex-row items-center justify-center w-172 p-4 space-x-4 bg-white rounded-xl shadow-xl/30">
    <h3 className="text-xl">{props.name} {props.lastName}</h3>
    <p>{props.email}</p>
    <p>{props.phone}</p>
    <button onClick={props.onDelete}
 className="px-4 py-2 !bg-blue-700 text-white rounded-xl hover:bg-blue-800">Delete</button>
  </div>
</div>
  );
}
