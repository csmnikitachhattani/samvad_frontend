// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Grid, TextField, MenuItem } from "@mui/material";

// export default function BillingDetails({ data, setData }) {

//   const [baseDepartments, setBaseDepartments] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [officeLevels, setOfficeLevels] = useState([]);
//   const [offices, setOffices] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [designations, setDesignations] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Base Department
//   useEffect(() => {
//     axios
//       .get("http://103.79.34.50:8083/api/ManageMaster/getdepartmentname")
//       .then((res) => setBaseDepartments(res.data?.result || []));
//   }, []);

//   // District
//   useEffect(() => {
//     axios
//       .get("http://103.79.34.50:8083/api/ManageMaster/getdistrictname")
//       .then((res) => setDistricts(res.data?.result || []));
//   }, []);

//   // Designation
//   useEffect(() => {
//     axios
//       .get("http://103.79.34.50:8083/api/ManageMaster/getclientdesignation")
//       .then((res) => setDesignations(res.data?.result || []));
//   }, []);

//   // Office Level
//   useEffect(() => {
//     if (!data.baseDepartment) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getofficelevel/${data.baseDepartment}`
//       )
//       .then((res) => setOfficeLevels(res.data?.result || []));
//   }, [data.baseDepartment]);

//   // Office
//   useEffect(() => {
//     if (!data.baseDepartment || !data.district_code) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getofficename/${data.district_code}/${data.baseDepartment}`
//       )
//       .then((res) => setOffices(res.data?.result || []));
//   }, [data.baseDepartment, data.district_code]);

//   // Section
//   useEffect(() => {
//     if (!data.baseDepartment || !data.district_code) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getclientsection/${data.district_code}/${data.baseDepartment}`
//       )
//       .then((res) => setSections(res.data?.result || []));
//   }, [data.baseDepartment, data.district_code]);

//   // Officer
//   useEffect(() => {
//     if (!data.baseDepartment || !data.district_code) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getofficer/${data.district_code}/${data.baseDepartment}`
//       )
//       .then((res) => setOfficers(res.data?.result || []));
      
//   }, [data.baseDepartment, data.district_code]);

//   return (
//     <Grid container spacing={2.5}>

//       <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Base Department"
//           name="baseDepartment"
//           fullWidth
//           size="small"
//           value={data.baseDepartment || ""}
//           onChange={handleChange}
//         >
//           {baseDepartments.map((dept) => (
//             <MenuItem key={dept.deptid} value={dept.deptid}>
//               {dept.deptname}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//    <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="District"
//           name="district_code"
//           fullWidth
//           size="small"
//           value={data.district_code || ""}
//           onChange={handleChange}
//         >
//           {districts.map((dist) => (
//             <MenuItem key={dist.dstrictid} value={dist.dstrictid}>
//               {dist.districtname}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//    <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Office Level"
//           name="officeLevel"
//           fullWidth
//           size="small"
//           value={data.officeLevel || ""}
//           onChange={handleChange}
//         >
//           {officeLevels.map((level) => (
//             <MenuItem key={level.officeLevelCode} value={level.officeLevelCode}>
//               {level.officeLevelName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Office"
//           name="office_code"
//           fullWidth
//           size="small"
//           value={data.office_code || ""}
//           onChange={handleChange}
//         >
//           {offices.map((off) => (
//             <MenuItem key={off.newOfficeCode} value={off.newOfficeCode}>
//               {off.officeName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//      <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Section"
//           name="section"
//           fullWidth
//           size="small"
//           value={data.section || ""}
//           onChange={handleChange}
//         >
//           {sections.map((sec) => (
//             <MenuItem key={sec.sectionCode} value={sec.sectionCode}>
//               {sec.sectionName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//     <Grid item size={{xs: 12, md: 3}}>
//   <TextField
//     select
//     label="Officer"
//     name="officer"
//     fullWidth
//     size="small"
//     value={data.officer || ""}
//     onChange={handleChange}
//   >
//     {officers.map((off) => (
//       <MenuItem key={off.employeeId} value={off.employeeId}>
//         {off.employeeName}
//       </MenuItem>
//     ))}
//   </TextField>
// </Grid>

//      {/* <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Designation"
//           name="designation"
//           fullWidth
//           size="small"
//           value={data.designation || ""}
//           onChange={handleChange}
//         >
//           {designations.map((des) => (
//             <MenuItem key={des.designationId} value={des.designationId}>
//               {des.designationName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid> */}

//     </Grid>
//   );
// }

// ===========working============================================

// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Grid, TextField, MenuItem } from "@mui/material";

// export default function BillingDetails({ data, setData }) {

//   const [baseDepartments, setBaseDepartments] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [officeLevels, setOfficeLevels] = useState([]);
//   const [offices, setOffices] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [designations, setDesignations] = useState([]); // ✅ added state

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Base Department
//   useEffect(() => {
//     axios
//       .get("http://103.79.34.50:8083/api/ManageMaster/getdepartmentname")
//       .then((res) => setBaseDepartments(res.data?.result || []));
//   }, []);

//   // District
//   useEffect(() => {
//     axios
//       .get("http://103.79.34.50:8083/api/ManageMaster/getdistrictname")
//       .then((res) => setDistricts(res.data?.result || []));
//   }, []);

//   // Designation
//   useEffect(() => {
//     axios
//       .get("http://103.79.34.50:8083/api/ManageMaster/getclientdesignation")
//       .then((res) => setDesignations(res.data?.result || []));
//   }, []);

//   // Office Level
//   useEffect(() => {
//     if (!data.baseDepartment) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getofficelevel/${data.baseDepartment}`
//       )
//       .then((res) => setOfficeLevels(res.data?.result || []));
//   }, [data.baseDepartment]);

//   // Office
//   useEffect(() => {
//     if (!data.baseDepartment || !data.district_code) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getofficename/${data.district_code}/${data.baseDepartment}`
//       )
//       .then((res) => setOffices(res.data?.result || []));
//   }, [data.baseDepartment, data.district_code]);

//   // Section
//   useEffect(() => {
//     if (!data.baseDepartment || !data.district_code) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getclientsection/${data.district_code}/${data.baseDepartment}`
//       )
//       .then((res) => setSections(res.data?.result || []));
//   }, [data.baseDepartment, data.district_code]);

//   // Officer
//   useEffect(() => {
//     if (!data.baseDepartment || !data.district_code) return;

//     axios
//       .get(
//         `http://103.79.34.50:8083/api/ManageMaster/getofficer/${data.district_code}/${data.baseDepartment}`
//       )
//       .then((res) => setOfficers(res.data?.result || []));
//   }, [data.baseDepartment, data.district_code]);

//   return (
//     <Grid container spacing={2.5}>
      
  
//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Billing Base Department"
//           name="Billing_base_dept_code"
//           fullWidth
//           size="small"
//           value={data.Billing_base_dept_code ||data.baseDepartment}
//           onChange={handleChange}
//         >
//           {baseDepartments.map((dept) => (
//             <MenuItem key={dept.deptid} value={dept.deptid}>
//               {dept.deptname}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

     
//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Billing District"
//           name="billing_district_code"
//           fullWidth
//           size="small"
//           value={data.billing_district_code || data.district_code}
//           onChange={handleChange}
//         >
//           {districts.map((dist) => (
//             <MenuItem key={dist.dstrictid} value={dist.dstrictid}>
//               {dist.districtname}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Billing Office Level"
//           name="billing_officeLevel"
//           fullWidth
//           size="small"
//           value={data.billing_officeLevel ||data.officeLevel }
//           onChange={handleChange}
//         >
//           {officeLevels.map((level) => (
//             <MenuItem key={level.officeLevelCode} value={level.officeLevelCode}>
//               {level.officeLevelName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

      
//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Billing Office"
//           name="billing_office_code"
//           fullWidth
//           size="small"
//           value={data.billing_office_code ||data.office_code }
//           onChange={handleChange}
//         >
//           {offices.map((off) => (
//             <MenuItem key={off.newOfficeCode} value={off.newOfficeCode}>
//               {off.officeName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

 
//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Billing Section"
//           name="billing_section"
//           fullWidth
//           size="small"
//           value={data.billing_section ||data.section }
//           onChange={handleChange}
//         >
//           {sections.map((sec) => (
//             <MenuItem key={sec.sectionCode} value={sec.sectionCode}>
//               {sec.sectionName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

      
//     <Grid item size={{xs: 12, md: 3}}>
//         <TextField
//           select
//           label="Billing Officer"
//           name="billing_officer"
//           fullWidth
//           size="small"
//           value={data.billing_officer || data.officer}
//           onChange={handleChange}
//         >
//           {officers.map((off) => (
//             <MenuItem key={off.employeeId} value={off.employeeId}>
//               {off.employeeName}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//     </Grid>
//   );
// }
// // =============================================================



"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

export default function BillingDetails({ data, setData }) {

  const [baseDepartments, setBaseDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [officeLevels, setOfficeLevels] = useState([]);
  const [offices, setOffices] = useState([]);
  const [sections, setSections] = useState([]);
  const [officers, setOfficers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Base Department
  useEffect(() => {
    axios
      .get("http://103.79.34.50:8083/api/ManageMaster/getdepartmentname")
      .then((res) => setBaseDepartments(res.data?.result || []));
  }, []);

  // District
  useEffect(() => {
    axios
      .get("http://103.79.34.50:8083/api/ManageMaster/getdistrictname")
      .then((res) => setDistricts(res.data?.result || []));
  }, []);

  // Office Level
  useEffect(() => {
    if (!data.Billing_base_dept_code) return;

    axios
      .get(
        `http://103.79.34.50:8083/api/ManageMaster/getofficelevel/${data.Billing_base_dept_code}`
      )
      .then((res) => setOfficeLevels(res.data?.result || []));
  }, [data.Billing_base_dept_code]);

  // Office
  useEffect(() => {
    if (!data.Billing_base_dept_code || !data.billing_district_code) return;

    axios
      .get(
        `http://103.79.34.50:8083/api/ManageMaster/getofficename/${data.billing_district_code}/${data.Billing_base_dept_code}`
      )
      .then((res) => setOffices(res.data?.result || []));
  }, [data.Billing_base_dept_code, data.billing_district_code]);

  // Section
  useEffect(() => {
    if (!data.Billing_base_dept_code || !data.billing_district_code) return;

    axios
      .get(
        `http://103.79.34.50:8083/api/ManageMaster/getclientsection/${data.billing_district_code}/${data.Billing_base_dept_code}`
      )
      .then((res) => setSections(res.data?.result || []));
  }, [data.Billing_base_dept_code, data.billing_district_code]);

  // Officer
  useEffect(() => {
    if (!data.Billing_base_dept_code || !data.billing_district_code) return;

    axios
      .get(
        `http://103.79.34.50:8083/api/ManageMaster/getofficer/${data.billing_district_code}/${data.Billing_base_dept_code}`
      )
      .then((res) => setOfficers(res.data?.result || []));
  }, [data.Billing_base_dept_code, data.billing_district_code]);

  return (
    <Grid container spacing={2.5}>

      {/* Billing Base Department */}
      <Grid item size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label="Billing Base Department"
          name="Billing_base_dept_code"
          fullWidth
          size="small"
          value={data.Billing_base_dept_code || ""}
          onChange={handleChange}
        >
          {baseDepartments.map((dept) => (
            <MenuItem key={dept.deptid} value={dept.deptid}>
              {dept.deptname}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Billing District */}
      <Grid item size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label="Billing District"
          name="billing_district_code"
          fullWidth
          size="small"
          value={data.billing_district_code || ""}
          onChange={handleChange}
        >
          {districts.map((dist) => (
            <MenuItem key={dist.dstrictid} value={dist.dstrictid}>
              {dist.districtname}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Billing Office Level */}
      <Grid item size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label="Billing Office Level"
          name="Billing_office_level_code"
          fullWidth
          size="small"
          value={data.Billing_office_level_code || ""}
          onChange={handleChange}
        >
          {officeLevels.map((level) => (
            <MenuItem key={level.officeLevelCode} value={level.officeLevelCode}>
              {level.officeLevelName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Billing Office */}
      <Grid item size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label="Billing Office"
          name="Billing_office_code"
          fullWidth
          size="small"
          value={data.Billing_office_code || ""}
          onChange={handleChange}
        >
          {offices.map((off) => (
            <MenuItem key={off.newOfficeCode} value={off.newOfficeCode}>
              {off.officeName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Billing Section */}
      <Grid item size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label="Billing Section"
          name="Billing_section_code"
          fullWidth
          size="small"
          value={data.Billing_section_code || ""}
          onChange={handleChange}
        >
          {sections.map((sec) => (
            <MenuItem key={sec.sectionCode} value={sec.sectionCode}>
              {sec.sectionName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Billing Officer */}
      <Grid item size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label="Billing Officer"
          name="Billing_client_prarup_code"
          fullWidth
          size="small"
          value={data.Billing_client_prarup_code || ""}
          onChange={handleChange}
        >
          {officers.map((off) => (
            <MenuItem key={off.employeeId} value={off.employeeId}>
              {off.employeeName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

    </Grid>
  );
}