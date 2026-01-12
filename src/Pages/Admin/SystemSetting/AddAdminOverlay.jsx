import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import  FormLabel  from '@mui/material/FormLabel';


export default function AddAdminOverlay({open ,onClose}){
      const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassowrd:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Data:", formData);
    onClose(); 
  };

       return(
       
         <Modal open={open} onClose={onClose}  >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: 700,
              borderRadius: 3,
              backgroundColor:"#F7F7F7",
              p:3
            }}
          >
            <Typography sx={{color:"#505050",
                fontSize:"24px",fontWeight:"700",
                textTransform:"capitalize"
                }}>Add Admin</Typography>
            
            <FormLabel sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:700}}>Name</FormLabel>
             <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{border:"1px solid #6B6B6B",backgroundColor:"#FFFFFF",borderRadius:"8px",color:"#6B6B6B87"}}
        />

        {/* Email */}
        <FormLabel sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:700}}>Email</FormLabel>
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{border:"1px solid #6B6B6B",backgroundColor:"#FFFFFF",borderRadius:"8px",color:"#6B6B6B87"}}
        />
         {/* password */}
         <FormLabel sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:700}}>Password</FormLabel>
        <TextField
          label="enter your password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{border:"1px solid #6B6B6B",backgroundColor:"#FFFFFF",borderRadius:"8px",color:"#6B6B6B87"}}
        />
         <FormLabel sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:700}}>Confirm Password</FormLabel>
        <TextField
          label="confirm password"
          name="password"
          type="password"
          value={formData.confirmPassowrd}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{border:"1px solid #6B6B6B",backgroundColor:"#FFFFFF",borderRadius:"8px",color:"#6B6B6B87"}}
        />


               {/* actions */}
              <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <Button sx={{width:"151px",border:"1px solid #666666"}}
                onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}
                sx={{width:"151px"}}
                variant="contained">
                  Save 
                </Button>
              </Box>
          </Box>
             </Modal>
       )
}