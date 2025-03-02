import React, { useEffect, useState } from "react";
import { GoUpload } from "react-icons/go";
import { MdCancel } from "react-icons/md";

export const FileUpload = ({
  label,
  register,
  onChangeFunc,
  name,
  error,
  fileName,
  isUploading,
  uploadedFileNames,
  handleFileChange,
  deleteFile,
  formattedPermissions,
  requiredPermissions,
  access,
}) => {
  
  console.log(isUploading);
  
  return (
    <div className="flex flex-col">
      {label && <label className="text_size_5">{label}</label>}

      {/* File Input Label */}
      <label
        onClick={() => {
          if (isUploading[name]) {
            alert(
              "Please delete the previously uploaded file before uploading a new one."
            );
          }
        }}
        className={`mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer
        `}
      >
        <input
          type="file"
          className="hidden"
          {...register}
          accept=".pdf, .jpg, .jpeg, .png"
          onChange={(e) => handleFileChange(e, name)}
          disabled={isUploading[name]}
        />
        <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
          {label}
          <GoUpload />
        </span>
      </label>

      {/* Display Uploaded File Names */}
      {uploadedFileNames[name] && (
        <p className="text-grey text-sm my-1">
          {Array.isArray(uploadedFileNames[name]) ? (
            uploadedFileNames[name]
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse()
              .map((fileName, fileIndex) => (
                <span
                  key={fileIndex}
                  className="mt-2 flex justify-between items-center"
                >
                  {fileName}
                  {formattedPermissions?.deleteAccess?.[access]?.some(
                    (permission) => requiredPermissions.includes(permission)
                  ) && (
                    <button
                      type="button"
                      className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                      onClick={() => deleteFile(name, fileName)}
                    >
                      <MdCancel />
                    </button>
                  )}
                </span>
              ))
          ) : (
            <span className="mt-2 flex justify-between items-center">
              {uploadedFileNames[name]}
              <button
                type="button"
                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none "
                onClick={() => deleteFile(name, uploadedFileNames[name])}
              >
                <MdCancel />
              </button>
            </span>
          )}
        </p>
      )}

      {/* Display Error Message */}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};

export const FileUploadField = ({
  label,
  register = () => ({}), // Ensure register is always defined
  fileKey,
  handleFileUpload,
  uploadedFileNames,
  deletedStringUpload,
  isUploadingString,
  error,
  formattedPermissions,
  requiredPermissions,
  access,
  check
}) => {
  const isUploading = isUploadingString?.[fileKey] ?? false;
  const recruitmentStatus = formattedPermissions?.deleteAccess?.[access]

  console.log(isUploading);
  // console.log("Str", isUploadingString.loiFile);
  
  return (
    <div className="flex flex-col">
      {/* Label */}
      {label && <label className="text_size_5">{label}</label>}

      {/* File Upload Input */}
      <label
        onClick={(e) => {
          if (isUploading) {
            e.preventDefault();
            alert(
              "Please delete the previously uploaded file before uploading a new one."
            );
          }
        }}
        className="flex items-center px-3 py-1.5 bg-lite_skyBlue border border-[#dedddd] rounded-md cursor-pointer mt-2"
      >
        <input
          type="file"
          {...register(fileKey)} 
          onChange={(e) => {
            if (!isUploading) {
              handleFileUpload(e, fileKey);
            }
          }}
          className="hidden"
          accept=".pdf, .jpg, .jpeg, .png"
        />
        
        <span className=" w-full ml-2 flex p-1 justify-between items-center text-grey gap-10">
           {label || "Upload File"} <GoUpload />
        </span>
      </label>

      {/* Uploaded File Name Display */}
      {/* {uploadedFileNames?.[fileKey] && ( */}
      <p className="text-xs mt-1 text-grey flex justify-between items-center">
        {uploadedFileNames[fileKey]}

        {uploadedFileNames[fileKey]?.length > 0 &&
        formattedPermissions?.deleteAccess?.[access]?.some((permission) =>
          requiredPermissions.includes(permission)
        ) ? (
          <button
            type="button"
            className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none "
            onClick={() =>
              deletedStringUpload(fileKey, uploadedFileNames?.[fileKey])
            }
          >
            <MdCancel />
          </button>
        ) : uploadedFileNames[fileKey]?.length > 0 && isUploading  ? (
          <button
            type="button"
            className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none "
            onClick={() =>
              deletedStringUpload(fileKey, uploadedFileNames?.[fileKey])
            }
          >
            <MdCancel />
          </button>
        ) : "" }
      </p>
      {/* Error Message */}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};

export const FileUploadFieldArr = ({
  label,
  register,
  onChangeFunc,
  error,
  fileName = "",
  deleteFile,
  field,
  formattedPermissions,
}) => {
  return (
    <div className="flex flex-col">
      {/* Label for the file upload field */}
      {label && <label className="text_size_5">{label}</label>}

      {/* File Upload Input */}
      <label className="w-full mt-2 max-w-[300px] flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer">
        <input
          type="file"
          className="hidden"
          {...register}
          onChange={onChangeFunc}
          accept=".pdf, .jpg, .jpeg, .png"
        />
        <span className="ml-2 text-grey font-normal flex justify-between items-center gap-20 text-sm w-full ">
        Upload File <GoUpload className="text-lg" /> 
        </span>
      </label>

      {/* Display Uploaded File Name */}
      {fileName && (
        <div className="mt-2">
          <div className="flex justify-between items-center text-sm text-grey my-1">
            <span>{fileName}</span>
            {/* {formattedPermissions?.deleteAccess?.Employee?.includes(
              "Medical & Dependent Info"
            ) && ( */}
            <button
              type="button"
              className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
              onClick={() => deleteFile(field?.name, fileName)}
            >
              <MdCancel />
            </button>
    
          </div>
        </div>
      )}

      {/* Display Error Message */}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};

export const FileUploadNew = ({
  label,
  error,
  handleFileChange,
  uploadedFileNames,
  isUploading,
  deleteFile,
  field,
  formattedPermissions,
  requiredPermissions,
  access,
}) => {
 

  return (
    <div className="flex flex-col w-[400px]">
      {label && <label className="text_size_5">{label}</label>}
      <label
        onClick={() => {
          if (isUploading[field.title]) {
            alert(
              "Please delete the previously uploaded file before uploading a new one."
            );
          }
        }}
        className="mt-2 flex items-center px-3 py-5 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer"
      >
        <input
          type="file"
          className="hidden"
          accept=".pdf,image/jpeg,image/png"
          onChange={(e) => handleFileChange(e, field.title)} // Pass field title for dynamic handling
          disabled={isUploading[field?.title]}
        />
        <span className="ml-2 text-[#636363] w-full font-medium flex justify-between items-center gap-10">
          <p>Only PDF</p>
          <GoUpload />
        </span>
      </label>

      {/* Display uploaded files */}
      <p className="text-xs mt-1 text-grey px-1">
        {uploadedFileNames?.[field.title] ? (
          Array.isArray(uploadedFileNames[field.title]) ? (
            uploadedFileNames[field.title]
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse()
              .map((fileName, fileIndex) => (
                <span
                  key={fileIndex}
                  className="mt-2 flex justify-between items-center"
                >
                  {fileName}
                  {formattedPermissions?.deleteAccess?.[access]?.some(
                    (permission) => requiredPermissions.includes(permission)
                  ) && (
                    <button
                      type="button"
                      className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                      onClick={() => deleteFile(field.title, fileName)}
                    >
                      <MdCancel />
                    </button>
                  )}
                </span>
              ))
          ) : (
            <span className="mt-2 flex justify-between items-center">
              {uploadedFileNames[field.title]}
              <button
                type="button"
                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                onClick={() =>
                  deleteFile(field.title, uploadedFileNames[field.title])
                }
              >
                <MdCancel />
              </button>
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
  errors,
  watchedEmpID,
  isUploading,
  deleteFile,
  formattedPermissions,
  requiredPermissions,
  access,
  check,

}) => {
  // console.log(uploadedFileNames);

  return (
    <div className="form-group">
      <label className="mb-1 text_size_6">{field.label}</label>
      {field.type === "text" || field.type === "date" ? (
        <>
          <input
            type={field.type}
            {...register(field.name)}
            className="input-field"
          />
          {errors[field.name] && (
            <p className="text-[red] text-[12px] pt-1">
              {errors[field.name]?.message}
            </p>
          )}
        </>
      ) : field.type === "file" ? (
        <>
          <label
            onClick={() => {
              if (isUploading[field.name]) {
                alert(
                  "Please delete the previously uploaded file before uploading a new one."
                );
              }
            }}
            className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer"
          >
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/jpeg,image/png"
              onChange={(e) => handleFileChange(e, field.name)} // Pass field name for dynamic handling
              disabled={isUploading[field.name]}
            />
            <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10 ">
              {field.label}
              <GoUpload />
              {/* {field.icon} */}
            </span>
          </label>

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
                      {formattedPermissions?.deleteAccess?.[access]?.some(
                        (permission) => requiredPermissions.includes(permission)
                      ) && (
                        // {console.log(formattedPermissions?.deleteAccess)}
                        <button
                          type="button"
                          className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                          onClick={() => deleteFile(field.name, fileName)}
                        >
                          <MdCancel />
                        </button>
                      )}
                    </span>
                  ))
              ) : (
                <span className="mt-2 flex justify-between items-center">
                  {uploadedFileNames[field.name]}
                  <button
                    type="button"
                    className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                    onClick={() =>
                      deleteFile(field.name, uploadedFileNames[field.name])
                    }
                  >
                    <MdCancel />
                  </button>
                </span>
              )}
            </p>
          )}

          {errors[field.name] && (
            <p className="text-[red] text-[12px] pt-2">
              {errors[field.name]?.message}
            </p>
          )}
        </>
      ) : null}
    </div>
  );
};

export const FileUploadFieldNew = ({
  label,
  register,
  onChangeFunc,
  error,
  fileName,
  uploadedFileNames,
  deleteFile,
  fileType,
  isUploading,
  field,
  index,
  disabled,
  formattedPermissions,
  requiredPermissions,
  access,
}) => {
  // const access = "Employee";

  return (
    <div className="flex flex-col">
      {label && <label className="text_size_5">{label}</label>}
      <label
        onClick={() => {
          if (disabled) {
            alert(
              "Please delete the previously uploaded file before uploading a new one."
            );
          }
        }}
        className="mt-2 flex items-center px-3 py-3 text_size_7 bg-lite_skyBlue border border-[#dedddd] rounded cursor-pointer"
      >
        <input
          type="file"
          className="hidden"
          {...register}
          onChange={onChangeFunc}
          accept=".pdf"
          disabled={disabled}
        />
        <span className="w-full ml-2 text-grey font-normal flex justify-between items-center gap-20 text-sm">
        Upload File <GoUpload className="text-lg" /> 
        </span>
      </label>
      {fileName && (
        <p className="text-grey text-sm my-1">
          {Array.isArray(fileName) ? (
            fileName
              .slice()
              .reverse()
              .map((file, fileIndex) => (
                <span
                  key={fileIndex}
                  className="mt-2 flex justify-between items-center"
                >
                  {file}
                  {/* {console.log(formattedPermissions?.deleteAccess)} */}
                  {formattedPermissions?.deleteAccess?.[access]?.some(
                    (permission) => requiredPermissions.includes(permission)
                  ) && (
                    <button
                      type="button"
                      className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                      onClick={() => {
                        deleteFile(file);
                      }}
                    >
                      <MdCancel />
                    </button>
                  )}
                </span>
              ))
          ) : fileName && (
            <span className="mt-2 flex justify-between items-center">
              {fileName}

              <button
                type="button"
                className="ml-2 text-[16px] font-bold text-[#F24646] hover:text-[#F24646] focus:outline-none"
                onClick={() => deleteFile(fileName)}
              >
                <MdCancel />
              </button>
            </span>
          )}
        </p>
      )}
      {error && <p className="text-[red] text-[12px] mt-1">{error.message}</p>}
    </div>
  );
};
