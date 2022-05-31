import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";


const ErrorsPage = () => {
    const [validationError, setValidationError] = useState<string[]>([])
    const getValidationError = ()=>{
        agent.testError.getValidationError()
        .then(()=>console.log('should no see this')
        ).catch(error=>setValidationError(error))
    }
  return (
    <Container>
      <Typography gutterBottom variant="h4">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.testError.get404Error().catch((error) => console.log(error))
          }
        >
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.testError.get401Error().catch((error) => console.log(error))}
        >
          Test Unauthorized error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.testError.get400Error().catch((error) => console.log(error))}
        >
          Test Bad request error
        </Button>
        <Button
          variant="contained"
          onClick={getValidationError}
        >
          Test Validation error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.testError.get500Error().catch((error) => console.log(error))}
        >
          Test server error
        </Button>
      </ButtonGroup>
      {validationError.length > 0 && <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
              {validationError.map(error=>(
                  <ListItem key={error}>
                      <ListItemText>{error}</ListItemText>
                  </ListItem>
              ))}
          </List>
          </Alert>
          }
    </Container>
  );
};

export default ErrorsPage;
