import React, { Component} from 'react';
import './index.css';
import {
  Box,
  Button,
  Heading,
  Grommet,
  FormField,
  Form,
  Text
} from 'grommet';

import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: '#000000'
    },
    font: {
      family: 'Lato',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='center'
    height='70px'
    background='#272343'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1' }}
    {...props} />
);
export class CreateAccount extends Component {
  constuctor() {
  }

  render() {

    return (
      <Grommet theme={theme} full>
        <AppBar>
          <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>Hospital appointment booking management system</Heading></a>
        </AppBar>
        
        <Box fill align="center" justify="top" className='forme'>
  
        <Box direction="row" align="center"  justify="center" width='medium' pad="small" className='iamdoc'>
                <Text>Are you a doctor?</Text>
                <Button
                  className='button-secondary'
                  label="I'm a doctor"
                  href="/MakeDoc" />
              </Box>
          <Box width="medium" className='form-content'>
          <Text color = "#AAAAAA">Patient's registration form:</Text>
            <Form
              onReset={event => console.log(event)}
              method="post"
              onSubmit={({ value }) => {
                console.log("Submit", value);

                fetch("http://localhost:3001/checkIfPatientExists?email=" + value.email)
                  .then(res => res.json())
                  .then(res => {
                    console.log(res.data[0]);

                    if ((res.data[0])) {
                      window.alert("An account is already associated with that email.");
                      console.log("no user found");
                    } else {
                      fetch("http://localhost:3001/makeAccount?name=" + value.firstName + "&lastname=" + value.lastName + "&email=" + value.email
                        + "&password=" + value.password + "&address=" + value.address + "&gender=" + value.gender
                        + "&conditions=" + value.conditions + "&medications=" + value.medications + "&surgeries=" + value.surgeries);
                      window.location = "/Home";
                    }
                  });
              }}>
              <FormField
                label="First Name"
                name="firstName"
                placeholder="First name"
                required
                validate={{ regexp: /^[a-z]/i }} />
              <FormField
                label="Last Name"
                name="lastName"
                required
                placeholder="Last Name"
                validate={{ regexp: /^[a-z]/i }} />
              <FormField
                label="Gender"
                name="gender"
                placeholder="Female or Male"
                required />
              <FormField
                label="Medical History - Conditions"
                name="conditions"
                placeholder="Conditions"
               />
              <FormField
                label="Medical History - Surgeries"
                name="surgeries"
                placeholder="Surgeries"
               />
              <FormField
                label="Medical History - Medications"
                name="medications"
                placeholder="Medications"
               />
              <FormField
                label="Address"
                name="address"
                placeholder="Address"
                required />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                required />
              <FormField
                label="Password"
                name="password"
                placeholder="Password"
                required
                validate={{ regexp: /^(?=.{8,})(?=.*[0-9]{2})/, message: "@ least 8 characters containing 2 digits" }} />
              <Box direction="row" align="center" >
                <Button className='button-secondary'
                  style={{ textAlign: 'center' }}
                  label="Cancel"
                  fill="horizontal"
                  href="/" />
                <Button className='button-primary'
                  label="Sign Up"
                  fill="horizontal"
                  type="submit"
                   />
              </Box>
             
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default CreateAccount;