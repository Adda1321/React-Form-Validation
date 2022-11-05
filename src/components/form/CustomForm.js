import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Data from "../constant/StateCode.json";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Alert from "@mui/material/Alert";
import "../../App.css";
import ThankYou from "../ThankYou";
export default function CustomForm() {
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const myHelper = {
    email: {
      required: "Email is Required",
      pattern: "Invalid Email Address",
    },
    lastName: {
      required: "Last Name is Required",
      pattern: "Please enter only letters , hyphens and colons",
    },
    firstName: {
      required: "First Name is Required",
      pattern: "Please enter only Characters",
    },
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const onSubmit = (data) => {
    setSuccess(true);
  };

  const handleChange = (event) => {
    setState(event.target.value);
  };
  const handleZipCode = async (event) => {
    if (event.target.value.length < 6) {
      setZipCode(event.target.value);
      const url = `https://www.zipcodeapi.com/rest/5APCZNBGnjmauXVVPANIdElpGTqi9HCa9uPtCgI8GmiKDJRytPSjzPPcwF5IFzye/info.json/${event.target.value}/radians`;
      if (event.target.value.length == 5) {
        setLoading(true);
        try {
          const response = await axios.get(url);
          setState(response.data.state);
          setLoading(false);
          setZipCodeError(false);
          clearErrors("Zip_code");
        } catch (error) {
          setLoading(false);
          setSuccess(false);
          setZipCodeError(true);
        }
      }
    }
  };
  if (success) return <ThankYou />;

  return (
    <div>
      {zipCodeError && <Alert severity="error">Enter a valid ZipCode</Alert>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="App"
        style={{ marginTop: "20px" }}
      >
        <Controller
          control={control}
          name="first name"
          defaultValue=""
          rules={{
            required: true,
            pattern: /^[A-Za-z]+$/i,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              style={{ width: "300px", margin: "5px" }}
              variant="outlined"
              label="First Name"
              error={error !== undefined}
              helperText={error ? myHelper.firstName[error.type] : ""}
            />
          )}
        />
        <br />

        <Controller
          control={control}
          name="last name"
          defaultValue=""
          rules={{
            required: true,
            pattern: /([A-Za-z'"-]+)$/i,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              style={{ width: "300px", margin: "5px" }}
              variant="outlined"
              label="Last Name"
              error={error !== undefined}
              helperText={error ? myHelper.lastName[error.type] : ""}
            />
          )}
        />

        <br />

        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              style={{ width: "300px", margin: "5px" }}
              type="email"
              fullWidth
              label="Email"
              error={error !== undefined}
              helperText={error ? myHelper.email[error.type] : ""}
            />
          )}
        />
        <br />

        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Zip Code"
          variant="outlined"
          {...register("Zip_code", { required: true, minLength: 5 })}
          value={zipCode}
          onChange={handleZipCode}
          error={errors.Zip_code && true}
          helperText={errors.Zip_code && "Please Enter a Valid Zip Code"}
        />
        <br />

        <FormControl sx={{ margin: "5px", textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            style={{ width: "300px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            label="State"
            defaultValue=""
            disabled={loading && true}
            onChange={handleChange}
          >
            {Object.entries(Data[0]).map((val) => (
              <MenuItem key={val[0]} value={val[0]}>
                {val[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <Button
          type="submit"
          variant="contained"
          disabled={loading && true}
          sx={{ width: "300px", margin: "5px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
