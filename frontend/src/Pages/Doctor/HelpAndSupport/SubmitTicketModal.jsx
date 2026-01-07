   import Modal from "@mui/material/Modal";
   import Box from "@mui/material/Box";
   import Card from "@mui/material/Card";
   import Button from "@mui/material/Button";
   
   
   
  export default function SubmitTicket({open , onClose}){
    return(
         
   <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 900,
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

            <TextField
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
              <Button sx={{ width: "151px" }} onClick={onclose}>
                Cancel
              </Button>
              <Button sx={{ width: "151px" }} variant="contained">
                Send
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    )
  }