import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";



export const FileUploadField = ({
  label,
  register,
  onChangeFunc,
  name,
  error,
  fileName,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text_size_5">{label}</label>}
      <label className="w-full mt-2 max-w-[300px] flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          {...register}
          onChange={onChangeFunc}
          accept=".pdf"
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20 text-sm">
          <GoUpload className="text-lg" /> PDF Only
        </span>
      </label>
      <p className="text-grey text-sm my-1">{fileName || ""}</p>
      {/* Display error message if error is present */}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};


export const FileUploadFieldArr = ({
  label,
  register,
  onChangeFunc,
  error,
  arrayFileNames,
  deleteFile,
  field,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text_size_5">{label}</label>}
      <label className="w-full mt-2 max-w-[300px] flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          {...register}
          onChange={onChangeFunc}
          accept=".pdf"
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20 text-sm">
          <GoUpload className="text-lg" /> PDF Only
        </span>
      </label>

      {/* Display uploaded file name */}
      {arrayFileNames?.[field.title] && (
        <p className="text-xs mt-1 text-grey px-1 border flex justify-between items-center">
          {arrayFileNames[field.title]}
          {/* <button
            type="button"
            className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
            onClick={() => deleteFile(field.title, arrayFileNames[field.title])}
          >
            <MdCancel />
          </button> */}
        </p>
      )}

      {/* Display error message if error is present */}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};


export const FileUploadNew = ({
  label,
  register,
  onChangeFunc,
  name,
  error,
  fileName,
  uploadedFileNames,
  // deleteFile,
  field
}) => {

  return (
    <div className="flex flex-col max-w-[300px]">
      {label && <label className="text_size_5">{label}</label>}
      <label className="w-full mt-2  flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          {...register(name)}
          onChange={onChangeFunc}
          accept=".pdf"
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20 text-sm">
          <GoUpload className="text-lg" /> PDF Only
        </span>
      </label>
      {/* <p className="text-grey text-sm my-1">{fileName || ""}</p> */}

      {/* Display uploaded files */}
      <p className="text-xs mt-1 text-grey px-1 ">
        {uploadedFileNames?.[field.title] ? (
          Array.isArray(uploadedFileNames[field.title]) ? (
            uploadedFileNames[field.title]
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse()
              .map((fileName, fileIndex) => (
                <span key={fileIndex} className="mt-2 flex justify-between items-center">
                  {fileName}
                  {/* <button
                    type="button"
                    className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                    onClick={() => deleteFile(field.title, fileName)}
                  >
                    <MdCancel />
                  </button> */}
                </span>
              ))
          ) : (
            <span className="mt-2 flex justify-between items-center">
              {uploadedFileNames[field.title]}
              {/* <button
                type="button"
                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                onClick={() =>
                  deleteFile(field.title, uploadedFileNames[field.title])
                }
              >
                <MdCancel />
              </button> */}
            </span>
          )
        ) : (
          <span></span>
        )}
      </p>

      {/* Display error message if error is present */}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};

export const UploadingFiles = ({
  field,
  register,
  handleFileChange,
  uploadedFileNames,
  errors,watchedEmpID,
  // deleteFile
}) => {
  // console.log(uploadedFileNames);

  return (
    <div className="form-group">
      <label className="mb-1 text_size_6">{field.label}</label>
      {field.type === "text" || field.type === "date" ? (
        <input
          type={field.type}
          {...register(field.name)}
          className="input-field"
        />
      ) : field.type === "file" ? (
        <label className="w-full mt-2  flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            {...register(field.name)}
            onChange={(e) => handleFileChange(e, field.name, watchedEmpID)}
          />
          <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
            <GoUpload /> PDF Only
          </span>
        </label>
      ) : null}

{uploadedFileNames[field.name] && (
        <p className="text-grey text-sm my-1">
          {Array.isArray(uploadedFileNames[field.name]) ? (
            uploadedFileNames[field.name]
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse()
              .map((fileName, fileIndex) => (
                <span
                  key={fileIndex}
                  className="mt-2 flex justify-between items-center"
                >
                  {fileName}
                  {/* <button
                    type="button"
                    className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                    onClick={() => deleteFile(field.name, fileName)}
                  >
                    <MdCancel />
                  </button> */}
                </span>
              ))
          ) : (
            <span className="mt-2 flex justify-between items-center">
              {uploadedFileNames[field.name]}
              {/* <button
                type="button"
                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                onClick={() =>
                  deleteFile(field.name, uploadedFileNames[field.name])
                }
              >
                <MdCancel />
              </button> */}
            </span>
          )}
        </p>
      )}
     {!uploadedFileNames[field.name] && errors[field.name] && (
  <p className="text-[red] text-[12px] pt-2">
    {errors[field.name]?.message}
  </p>
)}
    </div>
  );
};

// import { GoUpload } from "react-icons/go";

// export const FileUploadField = ({
//   label,
//   register,
//   onChangeFunc,
//   name,
//   error,
//   fileName,
// }) => {
//   return (
//     <div className="flex flex-col">
//       {label && <label className="text_size_5">{label}</label>}
//       <label className="w-full mt-2 max-w-[300px] flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
//         <input
//           type="file"
//           className="hidden"
//           {...register}
//           onChange={onChangeFunc}
//           accept=".pdf"
//         />
//         <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20 text-sm">
//           <GoUpload className="text-lg" /> PDF Only
//         </span>
//       </label>
//       <p className="text-grey text-sm my-1">{fileName || ""}</p>
//       {/* Display error message if error is present */}
//       {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
//     </div>
//   );
// };

// export const UploadingFiles = ({
//   field,
//   register,
//   handleFileChange,
//   uploadedFileNames,
//   errors,
// }) => {
//   return (
//     <div className="form-group">
//       <label className="mb-1 text_size_6">{field.label}</label>
//       {field.type === "text" || field.type === "date" ? (
//         <input
//           type={field.type}
//           {...register(field.name)}
//           className="input-field"
//         />
//       ) : field.type === "file" ? (
//         <label className="w-full mt-2  flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
//           <input
//             type="file"
//             className="hidden"
//             accept=".pdf"
//             {...register(field.name)}
//             onChange={(e) => handleFileChange(e, field.name)}
//           />
//           <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
//             <GoUpload /> PDF Only
//           </span>
//         </label>
//       ) : null}

//       {uploadedFileNames[field.name] && (
//         <p className="text-grey text-sm my-1">
//           {uploadedFileNames[field.name]}
//         </p>
//       )}
//      {!uploadedFileNames[field.name] && errors[field.name] && (
//   <p className="text-[red] text-[12px] pt-2">
//     {errors[field.name]?.message}
//   </p>
// )}
//     </div>
//   );
// };
