import { GoUpload } from "react-icons/go";

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

export const UploadingFiles = ({
  field,
  register,
  handleFileChange,
  uploadedFileNames,
  errors,
}) => {
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
        <label className="w-full mt-2 max-w-[300px] flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            {...register(field.name)}
            onChange={(e) => handleFileChange(e, field.name)}
          />
          <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20">
            <GoUpload /> PDF Only
          </span>
        </label>
      ) : null}

      {uploadedFileNames[field.name] && (
        <p className="text-grey text-sm my-1">
          {uploadedFileNames[field.name]}
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
