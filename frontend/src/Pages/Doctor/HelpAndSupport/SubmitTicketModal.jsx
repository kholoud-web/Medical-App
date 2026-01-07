   import Modal from "@mui/material/Modal";
   import Box from "@mui/material/Box";
   import Card from "@mui/material/Card";
   import Button from "@mui/material/Button";
   import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTicket, setSubject , setDetails} from "@/RiduxToolkit/Slices/HelpSupportSlice";
import { useDispatch ,useSelector} from "react-redux";
import { useState } from "react";
   
   
  export default function SubmitTicket({open , onClose}){
    const dispatch = useDispatch();
    const {subject , details, loading ,error}=useSelector((state)=>state.help);

//   state for sucess message
  const [success, setSuccess] = useState(false);

 

  const handleSubmit = async () => {
   if (!subject.trim() || !details.trim()) {
      alert("Please fill in both subject and details");

      return;
    }

    try {
      await dispatch(createTicket({ subject, details })).unwrap();
      
      setSuccess(true);
      
      setTimeout(() => {
        dispatch(setSubject(""));
        dispatch(setDetails(""));
        setSuccess(false);
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error("Failed to create ticket", err);
    }
  };
  // Handle input changes
  const handleSubjectChange = (e) => {
    dispatch(setSubject(e.target.value));
  };



  const handleDetailsChange = (e) => {
    dispatch(setDetails(e.target.value));
  };



  // Handle modal close
  const handleClose = () => {
    dispatch(setSubject(""));
    dispatch(setDetails(""));
    setSuccess(false);
    onClose();
  };

    return(
         
   <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 600,
            borderRadius: 3,
            backgroundColor: "#F7F7F7",
          }}
        >
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "#F7F7F7",
              border: "2px solid #D9D9D9",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#505050" }}
            >
              Submit Support Ticket 
            </Typography>
              {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Ticket submitted successfully!
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
            <TextField
            value={subject}
            onChange={handleSubjectChange}
            disabled={loading}
              fullWidth
              label=" Enter your Subject"
              sx={{
                mb: 2,
                color: "#6B6B6B",
                fontWeight: "700",
                border: "1px solid #6B6B6B",
                borderRadius: 2,
              }}
            />

            <TextField
            value={details}
            onChange={handleDetailsChange}
            disabled={loading}
              fullWidth
              label="Enter your Details"
              multiline
              rows={4}
              sx={{
                mb: 3,
                color: "#6B6B6B",
                fontWeight: "700",
                border: "1px solid #6B6B6B",
                borderRadius: 2,
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button sx={{ width: "151px" }} onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}
               sx={{ width: "151px" }} variant="contained">
                Send
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    )
  }