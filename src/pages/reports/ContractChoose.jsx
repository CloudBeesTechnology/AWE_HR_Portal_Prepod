import React from 'react';
import Performance from '../../utils/Performance';
export const ContractChoose = ({ register }) => {

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Employee Performance</h2>
      <Performance title="1) Communication and Inter-personal Skill" name="communication" register={register} />
      <Performance title="2) Quality of Work" name="quality" register={register} />
      <Performance title="3) Pace of Work" name="pace" register={register} />
      <Performance title="4) Initiative" name="initiative" register={register} />
      <Performance title="5) Attitude and professionalism" name="attitude" register={register} />
      <Performance title="6) Adaptability" name="adaptability" register={register} />
      <Performance title="7) Teamwork" name="teamwork" register={register} />
      <Performance title="8) Responsible and dependable" name="responsibility" register={register} />
      <Performance title="9) Diligent" name="diligent" register={register} />
      <Performance title="10) Commitment towards the job" name="commitment" register={register} />
    </div>
  );
};
