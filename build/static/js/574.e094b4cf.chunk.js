"use strict";(self.webpackChunkcheckingproject=self.webpackChunkcheckingproject||[]).push([[574],{2574:(e,r,i)=>{i.r(r),i.d(r,{default:()=>y});var t=i(9379),a=i(5043);const o=i.p+"static/media/laptop.71f79229493baaa66f65643c9949aad2.svg";var s=i(7305),n=i(5394),d=i(2902),l=i(784),u=i(4858),p=i(231),m=i(1580),c=i(8382),q=i(3646),j=i(579);const Y=(0,c.D)(),y=()=>{var e,r;const[i,c]=(0,a.useState)(!1),{register:y,formState:{errors:R},handleSubmit:h}=(0,u.mN)({resolver:(0,l.t)(d.Z2)}),[f,g]=(0,a.useState)(""),w=h((async e=>{try{var r,i;const t=e.userID,a=await Y.graphql({query:q.ZZ}),o=null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.listUsers)||void 0===i?void 0:i.items.find((e=>e.empID===t.toUpperCase()));if(o&&"Active"===o.status){const r=e.password,{isSignedIn:i}=await(0,p.J)({username:t,password:r}),a=await(0,m.H)();if(i||a){const e=a?a.username:t;localStorage.setItem("userID",e);const r=o.selectType;r?(localStorage.setItem("userType",r),window.location.href="/dashboard"):(console.error("userType not found"),alert("Access denied: Your account is inactive. Please contact the administrator for assistance"))}}else console.error("User is not active"),alert("Access denied: Your account is inactive. Please contact the administrator for assistance")}catch(f){console.error("Error during sign-in process:",f),g(f.message)}}));return(0,j.jsxs)("section",{className:"screen-size mx-auto flex h-screen",children:[(0,j.jsx)("div",{className:"flex-1 border-r-2  border-[#E9E9E9] center",children:(0,j.jsx)("img",{className:"w-full max-w-[450px]",src:o,alt:"Rightside Pic not found"})}),(0,j.jsxs)("div",{className:"flex-1 flex items-center gap-8 py-20 flex-col w-full px-3",children:[(0,j.jsxs)("div",{children:[" ",(0,j.jsx)("img",{className:"w-full max-w-[450px]",src:s.A,alt:"Logo not found"})]}),(0,j.jsxs)("article",{className:"text-center space-y-2",children:[(0,j.jsx)("h1",{className:"text-dark_grey title",children:"Welcome Back"}),(0,j.jsx)("p",{className:"text-dark_grey text_size_8",children:"Hello again! Dive into your tasks and let's make today productive."})]}),f&&(0,j.jsx)("p",{className:"text-red",children:f}),(0,j.jsxs)("section",{className:" space-y-5",children:[(0,j.jsxs)("div",{className:"w-[400px] space-y-1",children:[(0,j.jsx)("label",{htmlFor:"userID",className:"text-dark_grey text_size_8",children:"Login ID"}),(0,j.jsx)("div",{className:"shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 px-3 w-full",children:(0,j.jsx)("input",(0,t.A)({className:"outline-none py-2 w-full",type:"text",placeholder:"",id:"userID",name:"userID"},y("userID")))}),(0,j.jsx)("p",{className:"text-[red] text-sm my-2 ml-5",children:null===(e=R.userID)||void 0===e?void 0:e.message})]}),(0,j.jsxs)("div",{className:"w-[400px] space-y-1",children:[(0,j.jsx)("label",{htmlFor:"password",className:"text-dark_grey text_size_8",children:"Password"}),(0,j.jsxs)("div",{className:"shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center",children:[(0,j.jsx)("input",(0,t.A)({className:"outline-none py-2 w-full",type:i?"text":"password",placeholder:"",id:"password",name:"password"},y("password"))),i?(0,j.jsx)(n.whC,{className:"text-2xl text-[#837E7E]",onClick:()=>c(!i)}):(0,j.jsx)(n.Rds,{className:"text-2xl text-[#837E7E]",onClick:()=>c(!i)})]}),(0,j.jsx)("p",{className:"text-[red] text-sm my-2 ml-5",children:null===(r=R.password)||void 0===r?void 0:r.message})]}),(0,j.jsx)("div",{className:"center ",children:(0,j.jsx)("button",{className:"primary_btn text_size_4 my-5",onClick:w,children:"Login"})})]})]})]})}},2902:(e,r,i)=>{i.d(r,{$A:()=>s,CF:()=>j,Fh:()=>q,Io:()=>w,M3:()=>p,Rr:()=>g,UB:()=>f,UQ:()=>d,Z2:()=>a,_K:()=>c,_j:()=>y,gO:()=>n,gm:()=>R,h4:()=>o,iR:()=>h,mB:()=>m,me:()=>u,s8:()=>Y,uL:()=>l});var t=i(899);const a=t.Ik({userID:t.Yj().required("UserID is mandatory"),password:t.Yj().required("Password is Required")}),o=t.Ik({empID:t.Yj().required("Employee ID is required"),password:t.Yj().required("Temporary Password is required"),selectType:t.Yj().required("Please select a type"),officialEmail:t.Yj().required("OfficialEmail is required"),userID:t.Yj().required("User ID is mandatory"),name:t.Yj().required("Name is mandatory"),contactNo:t.Yj().required("Contact number is mandatory"),position:t.Yj().required("Position is mandatory"),department:t.Yj().required("Department is mandatory")}),s=t.Ik({userID:t.Yj().required("User ID is mandatory"),currentPassword:t.Yj().required("Current Password is mandatory"),password:t.Yj().min(8,"Password must be at least 8 characters").max(15,"Password cannot exceed 15 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character").required("Password is required"),confirmPassword:t.Yj().oneOf([t.KR("password"),null],"Passwords must match").required("Confirm password is required")}),n=t.Ik().shape({profilePhoto:t.gl().required("Upload Photo is mandatory").test("fileType","Profile photo must be a JPG or PNG file",(e=>!!e&&/\.(jpg|jpeg|png)$/.test(e.name))),agent:t.Yj().notRequired(),position:t.Yj().required("Position is mandatory"),contractType:t.Yj().required("Contract Type mandatory"),empType:t.Yj().required("Employee Type mandatory"),name:t.Yj().min(3,"Name must be at least 3 characters").required("Name is mandatory"),chinese:t.Yj().notRequired(),gender:t.Yj().required("Gender is mandatory"),dob:t.Yj().required("Date of Birth is mandatory"),age:t.ai().min(20,"Age must be at least 20").max(99,"Age cannot exceed 99").required("Age is required"),email:t.Yj().email("Please enter a valid email").required("Email is required"),cob:t.Yj().required("Country of Birth is mandatory"),nationality:t.Yj().required("Nationality is mandatory"),otherNation:t.Yj().when("nationality",{is:e=>e&&"other"===e.trim().toLowerCase(),then:()=>t.Yj().required("Other Nationality is required"),otherwise:()=>t.Yj()}),marital:t.Yj().required("Marital status is mandatory"),race:t.Yj().required("Race is mandatory"),otherRace:t.Yj().when("race",{is:e=>e&&"other"===e.trim().toLowerCase(),then:()=>t.Yj().required("Other Race is required"),otherwise:()=>t.Yj()}),religion:t.Yj().required("Religion is mandatory"),otherReligion:t.Yj().when("religion",{is:e=>e&&"other"===e.trim().toLowerCase(),then:()=>t.Yj().required("Other religion is required"),otherwise:()=>t.Yj()})}),d=e=>{console.log(e);const r=e&&("bruneian"===e.trim().toLowerCase()||"brunei pr"===e.trim().toLowerCase());return console.log(r),t.Ik({bwnIcNo:r?t.Yj().matches(/^\d{2}-\d{6}$/,"I/C Number must be in the format XX-XXXXXX, where X is a digit").required("I/C Number is mandatory for Bruneians"):t.Yj().notRequired(),bwnIcColour:r?t.Yj().required("I/C Colour is mandatory for Bruneians"):t.Yj().notRequired(),bwnIcExpiry:r?t.Yj().required("I/C Expiry is mandatory for Bruneians"):t.Yj().notRequired(),ppNo:r?t.Yj().notRequired():t.Yj().required("Passport Number is mandatory"),ppIssued:r?t.Yj().notRequired():t.Yj().required("Passport issued is mandatory"),ppExpiry:r?t.Yj().notRequired():t.Yj().required("Passport Expiry is mandatory"),ppDestinate:r?t.Yj().notRequired():t.Yj().required("Passport destination is mandatory"),alternateNo:t.Yj().notRequired(),contactNo:t.Yj().required("Contact Number is mandatory"),presentAddress:t.Yj().required("Present Address is mandatory"),permanentAddress:t.Yj().required("Permanent Address is mandatory"),driveLic:t.Yj().notRequired(),lang:t.Yj().required("Language is mandatory"),familyDetails:t.YO().of(t.Ik().shape({name:t.Yj().notRequired(),relationship:t.Yj().notRequired(),age:t.Yj().notRequired(),occupation:t.Yj().notRequired(),place:t.Yj().notRequired()})).notRequired(),eduDetails:t.YO().of(t.Ik().shape({university:t.Yj().required("University Name is mandatory "),fromDate:t.Yj().required("From Date is mandatory"),toDate:t.Yj().required("To Date is mandatory"),degree:t.Yj().required("Degree is mandatory")})).required("At least one education detail is mandatory"),workExperience:t.YO().of(t.Ik().shape({fromDate:t.Yj().notRequired(),toDate:t.Yj().notRequired(),companyAndAddress:t.Yj().notRequired(),position:t.Yj().notRequired(),salary:t.Yj().notRequired(),reasonLeaving:t.Yj().notRequired()}))})},l=t.Ik({referees:t.YO().of(t.Ik().shape({name:t.Yj().notRequired(),address:t.Yj().notRequired(),phoneNumber:t.Yj().notRequired(),profession:t.Yj().notRequired()})).notRequired(),relatives:t.YO().of(t.Ik().shape({name:t.Yj().notRequired(),position:t.Yj().notRequired(),relationship:t.Yj().notRequired()})).notRequired(),description:t.Yj().notRequired(),emgDetails:t.YO().of(t.Ik().shape({name:t.Yj().required("Name is mandatory"),relationship:t.Yj().required("Relationship is mandatory"),address:t.Yj().required("Address is mandatory"),phoneNumber:t.Yj().required("Phone Number is mandatory"),bloodGroup:t.Yj().notRequired()})).required("At least one emergency contact is mandatory"),disease:t.Yj().notRequired(),liquor:t.Yj().notRequired(),crime:t.Yj().notRequired(),diseaseDesc:t.Yj().when("disease",{is:e=>e&&"yes"===e.trim().toLowerCase(),then:()=>t.Yj().notRequired(),otherwise:()=>t.Yj()}),liquorDesc:t.Yj().when("liquor",{is:e=>e&&"yes"===e.trim().toLowerCase(),then:()=>t.Yj().notRequired(),otherwise:()=>t.Yj()}),crimeDesc:t.Yj().when("crime",{is:e=>e&&"yes"===e.trim().toLowerCase(),then:()=>t.Yj().notRequired(),otherwise:()=>t.Yj()})}),u=t.Ik().shape({salaryExpectation:t.Yj().notRequired(),noExperience:t.Yj().required("Experience is required"),noticePeriod:t.Yj().required("Notice period is required"),empStatement:t.Yj().required("Employee Statement is required"),perIS:t.Yj().required("Interview status is required"),perID:t.Yj().when("perInterviewStatus",{is:e=>e&&"yes"===e.trim().toLowerCase(),then:()=>t.Yj().notRequired(),otherwise:()=>t.Yj()}),supportInfo:t.Yj(),uploadResume:t.gl().required("Resume is required").test("fileType","Only PDF, Word, Excel, or image formats (JPEG, JPG, PNG, SVG) are allowed",(e=>e&&["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","image/jpeg","image/jpg","image/png","image/svg+xml"].includes(e.type))),uploadCertificate:t.gl().required("Certificate is required").test("fileType","Only PDF, Word, Excel, or image formats (JPEG, JPG, PNG, SVG) are allowed",(e=>e&&["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","image/jpeg","image/jpg","image/png","image/svg+xml"].includes(e.type))),uploadPp:t.gl().required("Passport is required").test("fileType","Only PDF, Word, Excel, or image formats (JPEG, JPG, PNG, SVG) are allowed",(e=>e&&["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","image/jpeg","image/jpg","image/png","image/svg+xml"].includes(e.type)))}),p=t.Ik().shape({nameReq:t.Yj().notRequired(),requestorID:t.Yj().notRequired(),approverID:t.Yj().notRequired(),department:t.Yj().required("Department is required"),project:t.Yj().required("Project is required"),position:t.Yj().required("Position is required"),quantity:t.ai().typeError("Quantity must be a number").required("Quantity is required"),reasonForReq:t.Yj().required("Reason for request is required"),justification:t.Yj().required("Justification is required"),replacementFor:t.Yj().notRequired(),qualification:t.Yj().required("State Qualification is required"),tentativeDate:t.p6().min(new Date,"Tentative date must be in the future").required("Tentative date is required").typeError("Please enter a valid date"),status:t.Yj().notRequired(),remarkReq:t.Yj().notRequired()}),m=t.Ik().shape({interDate:t.p6().required("Date is required").typeError("Date is required").min(new Date,"The selected date is in the past. Please choose a valid date."),interTime:t.Yj().required("Time is required").matches(/^(0[8-9]|1[0-5]):([0-5]\d)$/,"Please choose a time between 8:00 AM and 4:00 PM."),venue:t.Yj().required("Venue is required"),interType:t.Yj().notRequired(),empBadgeNo:t.Yj().notRequired("Badge Number is required"),manager:t.Yj().notRequired("Manager is required"),message:t.Yj().optional()}),c=t.Ik().shape({jobTitle:t.Yj().required("Job Title is required"),location:t.Yj().notRequired(),jobDesc:t.Yj().notRequired(),experience:t.Yj().required("Experience is required"),quantity:t.Yj().notRequired(),startDate:t.p6().nullable().transform(((e,r)=>""===r?null:e)).notRequired(),expiryDate:t.p6().nullable().transform(((e,r)=>""===r?null:e)).notRequired().test("is-future-date","Only Future Dates Allowed",(function(e){return!e||new Date(e)>new Date})),uploadJobDetails:t.Yj().notRequired()}),q=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),sawpLtrReq:t.p6().notRequired(),sawpLtrRece:t.p6().notRequired(),sawpFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),j=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),doeSubmit:t.p6().notRequired(),doeApproval:t.p6().notRequired(),doeValid:t.p6().notRequired(),doeRefNo:t.Yj().notRequired(),doeFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),Y=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),nlmsSubmit:t.p6().notRequired(),nlmsSubmitRefNo:t.Yj().notRequired(),nlmsApproval:t.p6().notRequired(),nlmsValid:t.p6().notRequired(),ldRefNo:t.Yj().notRequired(),nlmsFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),y=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),bgSubmit:t.p6().notRequired(),bgRece:t.p6().notRequired(),bgValid:t.p6().notRequired(),bgRefNo:t.Yj().notRequired(),bgAmount:t.Yj().notRequired(),bgFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),R=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),jpTbaPurchase:t.p6().notRequired(),jpEndorsement:t.p6().notRequired(),jitpaValid:t.p6().notRequired(),jpAmount:t.Yj().notRequired(),jitpaFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),h=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),labDepReceiptNo:t.Yj().notRequired(),labDepAmount:t.Yj().notRequired(),labEndrose:t.p6().notRequired(),labDepFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),f=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),immbdNo:t.Yj().notRequired(),docSubmit:t.p6().notRequired(),visaApproval:t.p6().notRequired(),visaRefNo:t.Yj().notRequired(),visaFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),g=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),departure:t.p6().notRequired(),arrival:t.p6().notRequired(),cityName:t.Yj().notRequired(),airFare:t.Yj().notRequired(),airTktFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))}),w=t.Ik().shape({tempID:t.Yj().required("Temporary ID is Required"),mobSignDate:t.p6().notRequired(),agent:t.Yj().notRequired(),remarkNLMob:t.Yj().notRequired(),mobFile:t.gl().nullable().notRequired().test("fileType","Only PDF files are allowed",(e=>!!e&&"application/pdf"===e.type))})}}]);
//# sourceMappingURL=574.e094b4cf.chunk.js.map