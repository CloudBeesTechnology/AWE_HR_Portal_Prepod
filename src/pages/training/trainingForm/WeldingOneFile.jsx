import React from 'react'

export const WeldingOneFile = ({register,errors}) => {
  return (
    <section className='grid grid-cols-2 gap-6 mt-6'>
        <div >
            <label className="text_size_5">Welding Stamp Number</label>
              <input
                {...register("weldingStampNor")}
                className="input-field"
                type="text"
              />
              {errors.weldingStampNor && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingStampNor.message}
                </p>
              )}
            </div>
            <div>
             <label className="text_size_5">WQR Number</label>
              <input
                {...register("WQRNo")}
                className="input-field"
                type="text"
              />
              {errors.WQRNo && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.WQRNo.message}
                </p>
              )}
             </div>

              <div>
              <label className="text_size_5">WPS Number</label>
              <input
                {...register("wpsNumber")}
                className="input-field"
                type="text"
              />
              {errors.wpsNumber && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.wpsNumber.message}
                </p>
              )}
              </div>
              <div>
              <label className="text_size_5">Welding Code</label>
              <input
                {...register("weldingCode")}
                className="input-field"
                type="text"
              />
              {errors.weldingCode && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingCode.message}
                </p>
              )}
              </div>
              
             <div>
             <label className="text_size_5">Welding Process</label>
              <input
                {...register("weldingProcess")}
                className="input-field"
                type="text"
              />
              {errors.weldingProcess && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingProcess.message}
                </p>
              )}
             </div>

             <div>
             <label className="text_size_5">Welding Material</label>
              <input
                {...register("weldingMaterial")}
                className="input-field"
                type="text"
              />
              {errors.weldingMaterial && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingMaterial.message}
                </p>
              )}
             </div>
            <div>
            <label className="text_size_5">Welding Position</label>
              <input
                {...register("weldingPosition")}
                className="input-field"
                type="text"
              />
              {errors.weldingPosition && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.weldingPosition.message}
                </p>
              )}
            </div>
            <div>
              <label className="text_size_5">Filler Metal</label>
              <input
                {...register("fillerMetal")}
                className="input-field"
                type="text"
              />
              {errors.fillerMetal && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.fillerMetal.message}
                </p>
              )}
              </div>
            <div>
            <label className="text_size_5">Thickness Range</label>
              <input
                {...register("thicknessRange")}
                className="input-field"
                type="text"
              />
              {errors.thicknessRange && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.thicknessRange.message}
                </p>
              )}
            </div>

            <div>
             <label className="text_size_5">Diameter Range</label>
              <input
                {...register("diameterRange")}
                className="input-field"
                type="text"
              />
              {errors.diameterRange && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.diameterRange.message}
                </p>
              )}
             </div>
              <div>
              <label className="text_size_5">
                Welding Qualification Expiry
              </label>
              <input
                {...register("WQExpiry")}
                className="input-field"
                type="date"
              />
              {errors.WQExpiry && (
                <p className="text-[red] text-[13px] mt-1">
                  {errors.WQExpiry.message}
                </p>
              )}
              </div>
              <div>
              <label className="text_size_5">
                Remarks for Welding Qualification
              </label>
              <input
                {...register("WQRemarks")}
                className="input-field"
                type="text"
              />
            </div>
    </section>
  )
}
