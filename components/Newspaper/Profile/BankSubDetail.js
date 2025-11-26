import {
    Card,
    CardContent,
    TextField,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    Grid,
    InputLabel,
  } from "@mui/material";
  
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddIcon from "@mui/icons-material/Add";
  import { useState, useEffect } from "react";
  import newspaperService from "@/services/newspaperService";
  
  export default function TaxDetailsForm() {
    const [selectedType, setSelectedType] = useState("PAN");

    const [formData, setFormData] = useState({
      PAN: { number: "", holder: "" },
      TIN: { number: "", state: "" },
      CST: { number: "", issuedDate: "" },
    });

    useEffect(() => {
      loadUser();
    }, []);
  
    const loadUser = async () => {
      const res = await newspaperService.getNewspaperBankSubDetails("000019");
      //setFormData(res?.data?.data[0] || {});
    };
    const handleCreate = () => {
      console.log("Create", selectedType, formData[selectedType]);
    };
  
    const handleEdit = () => {
      console.log("Edit", selectedType, formData[selectedType]);
    };
  
    const handleDelete = () => {
      console.log("Delete", selectedType);
    };
  
    // ---------------------------------
    // Render fields based on selected type
    // ---------------------------------
    const renderFields = () => {
      const fields = formData[selectedType];
  
      switch (selectedType) {
        case "PAN":
          return (
            <>
              <TextField
                fullWidth
                label="PAN Number"
                value={fields.number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PAN: { ...fields, number: e.target.value },
                  })
                }
              />
  
              <TextField
                fullWidth
                label="Holder Name"
                value={fields.holder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PAN: { ...fields, holder: e.target.value },
                  })
                }
              />
            </>
          );
  
        case "TIN":
          return (
            <>
              <TextField
                fullWidth
                label="TIN Number"
                value={fields.number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    TIN: { ...fields, number: e.target.value },
                  })
                }
              />
  
              <TextField
                fullWidth
                label="State"
                value={fields.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    TIN: { ...fields, state: e.target.value },
                  })
                }
              />
            </>
          );
  
        case "CST":
          return (
            <>
              <TextField
                fullWidth
                label="CST Number"
                value={fields.number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CST: { ...fields, number: e.target.value },
                  })
                }
              />
  
              <TextField
                fullWidth
                label="Issued Date"
                value={fields.issuedDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CST: { ...fields, issuedDate: e.target.value },
                  })
                }
              />
            </>
          );
  
        default:
          return null;
      }
    };
  
    return (
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
  
          {/* ---------------------------------
              DROPDOWN
          --------------------------------- */}
          <FormControl fullWidth>
            <InputLabel>Select Type</InputLabel>
            <Select
              value={selectedType}
              label="Select Type"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="PAN">PAN</MenuItem>
              <MenuItem value="TIN">TIN</MenuItem>
              <MenuItem value="CST">CST</MenuItem>
            </Select>
          </FormControl>
  
          {/* ---------------------------------
              DYNAMIC FIELDS
          --------------------------------- */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {renderFields()}
          </Grid>
  
          {/* ---------------------------------
              ACTION BUTTONS
          --------------------------------- */}
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <IconButton color="success" onClick={handleCreate}>
              <AddIcon />
            </IconButton>
  
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
  
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  