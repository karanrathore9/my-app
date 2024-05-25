import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formFields: [{ name: "", age: "", techStack: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formFields",
  });

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log(data);
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Submitted by - Karan Rathore</h1>
      <form
        className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 flex items-center">
            <div className="flex flex-grow">
              <Controller
                name={`formFields[${index}].name`}
                control={control}
                defaultValue={field.name}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <div className="mr-2 flex-grow">
                    <input
                      {...field}
                      placeholder="Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.formFields &&
                      errors.formFields[index] &&
                      errors.formFields[index].name && (
                        <p className="text-red-500 text-xs italic">
                          {errors.formFields[index].name.message}
                        </p>
                      )}
                  </div>
                )}
              />
              <Controller
                name={`formFields[${index}].age`}
                control={control}
                defaultValue={field.age}
                rules={{
                  required: "Age is required",
                  min: { value: 18, message: "Age must be at least 18" },
                  max: {
                    value: 100,
                    message: "Age must be less than or equal to 100",
                  },
                  valueAsNumber: true,
                }}
                render={({ field }) => (
                  <div className="mr-2 flex-grow">
                    <input
                      {...field}
                      type="number"
                      placeholder="Age"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.formFields &&
                      errors.formFields[index] &&
                      errors.formFields[index].age && (
                        <p className="text-red-500 text-xs italic">
                          {errors.formFields[index].age.message}
                        </p>
                      )}
                  </div>
                )}
              />
              <Controller
                name={`formFields[${index}].techStack`}
                control={control}
                defaultValue={field.techStack}
                rules={{ required: "Tech stack is required" }}
                render={({ field }) => (
                  <div className="mr-2 flex-grow">
                    <select
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Tech Stack</option>
                      <option value="MERN">MERN</option>
                      <option value="MEAN">MEAN</option>
                      <option value="DEVOPS">DEVOPS</option>
                      <option value="JAVA">JAVA</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.formFields &&
                      errors.formFields[index] &&
                      errors.formFields[index].techStack && (
                        <p className="text-red-500 text-xs italic">
                          {errors.formFields[index].techStack.message}
                        </p>
                      )}
                  </div>
                )}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => append({ name: "", age: "", techStack: "" })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add More Fields
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit Data
          </button>
        </div>
      </form>
      {submittedData && (
        <div className="mt-4 flex flex-wrap justify-center">
          <h2 className="text-xl font-bold mb-2">Submitted Data</h2>
          {submittedData.formFields.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 m-2">
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Age:</strong> {item.age}
              </p>
              <p>
                <strong>Tech Stack:</strong> {item.techStack}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
