import Dialog from '@mui/material/Dialog';
import { Table,TableBody, TableCell, TableContainer,TableHead,TableRow, } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'





const interactions = [
  {
    drug: "Warfarin",
    interactsWith: "Aspirin",
    severity: "High",
    action: "Avoid combination; increased risk of bleeding.",
  },
  {
    drug: "Lisinopril",
    interactsWith: "Ibuprofen",
    severity: "Moderate",
    action: "Monitor renal function and blood pressure.",
  },
  {
    drug: "Simvastatin",
    interactsWith: "Grapefruit Juice",
    severity: "Moderate",
    action: "Advise patient to avoid grapefruit products.",
  },
  {
    drug: "Metformin",
    interactsWith: "Cimetidine",
    severity: "Low",
    action: "Monitor for hypoglycemia.",
  },
];

const severityColor = (severity) => {
  switch (severity) {
    case "High":
      return "#d32f2f";
    case "Moderate":
      return "#ed6c02";
    case "Low":
      return "#2e7d32";
    default:
      return "inherit";
  }
};

export default function InteractionModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{p:3,width:"100%",height:"100%"}}
    >
        <Box sx={{p:2}}>
      {/* Title */}
      <Typography sx={{color:"#505050" ,fontWeight:"600" , fontSize:"30px"}}>Drug Interaction Check</Typography>
     <Divider sx={{my:2,width:"100%",color:"#DAE4FA"}}/>

     
        {/* Table */}
        <TableContainer 
          sx={{
            border: "1px solid #4682FA",
            borderRadius: 2,
            overflow: "hidden",
            p:2
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor:"#f5f8ff" }}>
                {["Drug", "Interacts With", "Severity", "Suggested Action"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      sx={{
                        fontWeight: 500,
                        color: "#4682FA",
                        fontSize:"20px",
                        backgroundColor:"#f5f8ff"
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {interactions.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{color:"#505050",fontWeight:"400", fontSize:"20px"}}>{row.drug}</TableCell>
                  <TableCell sx={{color:"#505050",fontWeight:"400", fontSize:"20px"}}>{row.interactsWith}</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      color: severityColor(row.severity),
                      fontSize:"20px"
                    }}
                  >
                    {row.severity}
                  </TableCell>
                  <TableCell sx={{color:"#505050",fontWeight:"400", fontSize:"20px"}}>{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={3}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: 2,
              px: 4,
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
