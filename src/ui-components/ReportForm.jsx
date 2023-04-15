/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Report } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ReportForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    pestSubmitted: undefined,
    image: "",
    longitude: "",
    latitude: "",
    address_number: "",
    address_street: "",
    address_neighborhood: "",
    address_municipality: "",
    address_region: "",
    address_country: "",
    address_postalCode: "",
  };
  const [pestSubmitted, setPestSubmitted] = React.useState(
    initialValues.pestSubmitted
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [longitude, setLongitude] = React.useState(initialValues.longitude);
  const [latitude, setLatitude] = React.useState(initialValues.latitude);
  const [address_number, setAddress_number] = React.useState(
    initialValues.address_number
  );
  const [address_street, setAddress_street] = React.useState(
    initialValues.address_street
  );
  const [address_neighborhood, setAddress_neighborhood] = React.useState(
    initialValues.address_neighborhood
  );
  const [address_municipality, setAddress_municipality] = React.useState(
    initialValues.address_municipality
  );
  const [address_region, setAddress_region] = React.useState(
    initialValues.address_region
  );
  const [address_country, setAddress_country] = React.useState(
    initialValues.address_country
  );
  const [address_postalCode, setAddress_postalCode] = React.useState(
    initialValues.address_postalCode
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPestSubmitted(initialValues.pestSubmitted);
    setImage(initialValues.image);
    setLongitude(initialValues.longitude);
    setLatitude(initialValues.latitude);
    setAddress_number(initialValues.address_number);
    setAddress_street(initialValues.address_street);
    setAddress_neighborhood(initialValues.address_neighborhood);
    setAddress_municipality(initialValues.address_municipality);
    setAddress_region(initialValues.address_region);
    setAddress_country(initialValues.address_country);
    setAddress_postalCode(initialValues.address_postalCode);
    setErrors({});
  };
  const validations = {
    pestSubmitted: [],
    image: [],
    longitude: [],
    latitude: [],
    address_number: [],
    address_street: [],
    address_neighborhood: [],
    address_municipality: [],
    address_region: [],
    address_country: [],
    address_postalCode: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          pestSubmitted,
          image,
          longitude,
          latitude,
          address_number,
          address_street,
          address_neighborhood,
          address_municipality,
          address_region,
          address_country,
          address_postalCode,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Report(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReportForm")}
      {...rest}
    >
      <SelectField
        label="Pest submitted"
        placeholder="Please select an option"
        isDisabled={false}
        value={pestSubmitted}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted: value,
              image,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.pestSubmitted ?? value;
          }
          if (errors.pestSubmitted?.hasError) {
            runValidationTasks("pestSubmitted", value);
          }
          setPestSubmitted(value);
        }}
        onBlur={() => runValidationTasks("pestSubmitted", pestSubmitted)}
        errorMessage={errors.pestSubmitted?.errorMessage}
        hasError={errors.pestSubmitted?.hasError}
        {...getOverrideProps(overrides, "pestSubmitted")}
      >
        <option
          children="Unknown"
          value="UNKNOWN"
          {...getOverrideProps(overrides, "pestSubmittedoption0")}
        ></option>
        <option
          children="Grape berry moth"
          value="GRAPE_BERRY_MOTH"
          {...getOverrideProps(overrides, "pestSubmittedoption1")}
        ></option>
        <option
          children="Spotted lantern fly"
          value="SPOTTED_LANTERN_FLY"
          {...getOverrideProps(overrides, "pestSubmittedoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image: value,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Longitude"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={longitude}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude: value,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.longitude ?? value;
          }
          if (errors.longitude?.hasError) {
            runValidationTasks("longitude", value);
          }
          setLongitude(value);
        }}
        onBlur={() => runValidationTasks("longitude", longitude)}
        errorMessage={errors.longitude?.errorMessage}
        hasError={errors.longitude?.hasError}
        {...getOverrideProps(overrides, "longitude")}
      ></TextField>
      <TextField
        label="Latitude"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={latitude}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude: value,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.latitude ?? value;
          }
          if (errors.latitude?.hasError) {
            runValidationTasks("latitude", value);
          }
          setLatitude(value);
        }}
        onBlur={() => runValidationTasks("latitude", latitude)}
        errorMessage={errors.latitude?.errorMessage}
        hasError={errors.latitude?.hasError}
        {...getOverrideProps(overrides, "latitude")}
      ></TextField>
      <TextField
        label="Address number"
        isRequired={false}
        isReadOnly={false}
        value={address_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number: value,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.address_number ?? value;
          }
          if (errors.address_number?.hasError) {
            runValidationTasks("address_number", value);
          }
          setAddress_number(value);
        }}
        onBlur={() => runValidationTasks("address_number", address_number)}
        errorMessage={errors.address_number?.errorMessage}
        hasError={errors.address_number?.hasError}
        {...getOverrideProps(overrides, "address_number")}
      ></TextField>
      <TextField
        label="Address street"
        isRequired={false}
        isReadOnly={false}
        value={address_street}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number,
              address_street: value,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.address_street ?? value;
          }
          if (errors.address_street?.hasError) {
            runValidationTasks("address_street", value);
          }
          setAddress_street(value);
        }}
        onBlur={() => runValidationTasks("address_street", address_street)}
        errorMessage={errors.address_street?.errorMessage}
        hasError={errors.address_street?.hasError}
        {...getOverrideProps(overrides, "address_street")}
      ></TextField>
      <TextField
        label="Address neighborhood"
        isRequired={false}
        isReadOnly={false}
        value={address_neighborhood}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood: value,
              address_municipality,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.address_neighborhood ?? value;
          }
          if (errors.address_neighborhood?.hasError) {
            runValidationTasks("address_neighborhood", value);
          }
          setAddress_neighborhood(value);
        }}
        onBlur={() =>
          runValidationTasks("address_neighborhood", address_neighborhood)
        }
        errorMessage={errors.address_neighborhood?.errorMessage}
        hasError={errors.address_neighborhood?.hasError}
        {...getOverrideProps(overrides, "address_neighborhood")}
      ></TextField>
      <TextField
        label="Address municipality"
        isRequired={false}
        isReadOnly={false}
        value={address_municipality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality: value,
              address_region,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.address_municipality ?? value;
          }
          if (errors.address_municipality?.hasError) {
            runValidationTasks("address_municipality", value);
          }
          setAddress_municipality(value);
        }}
        onBlur={() =>
          runValidationTasks("address_municipality", address_municipality)
        }
        errorMessage={errors.address_municipality?.errorMessage}
        hasError={errors.address_municipality?.hasError}
        {...getOverrideProps(overrides, "address_municipality")}
      ></TextField>
      <TextField
        label="Address region"
        isRequired={false}
        isReadOnly={false}
        value={address_region}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region: value,
              address_country,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.address_region ?? value;
          }
          if (errors.address_region?.hasError) {
            runValidationTasks("address_region", value);
          }
          setAddress_region(value);
        }}
        onBlur={() => runValidationTasks("address_region", address_region)}
        errorMessage={errors.address_region?.errorMessage}
        hasError={errors.address_region?.hasError}
        {...getOverrideProps(overrides, "address_region")}
      ></TextField>
      <TextField
        label="Address country"
        isRequired={false}
        isReadOnly={false}
        value={address_country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country: value,
              address_postalCode,
            };
            const result = onChange(modelFields);
            value = result?.address_country ?? value;
          }
          if (errors.address_country?.hasError) {
            runValidationTasks("address_country", value);
          }
          setAddress_country(value);
        }}
        onBlur={() => runValidationTasks("address_country", address_country)}
        errorMessage={errors.address_country?.errorMessage}
        hasError={errors.address_country?.hasError}
        {...getOverrideProps(overrides, "address_country")}
      ></TextField>
      <TextField
        label="Address postal code"
        isRequired={false}
        isReadOnly={false}
        value={address_postalCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pestSubmitted,
              image,
              longitude,
              latitude,
              address_number,
              address_street,
              address_neighborhood,
              address_municipality,
              address_region,
              address_country,
              address_postalCode: value,
            };
            const result = onChange(modelFields);
            value = result?.address_postalCode ?? value;
          }
          if (errors.address_postalCode?.hasError) {
            runValidationTasks("address_postalCode", value);
          }
          setAddress_postalCode(value);
        }}
        onBlur={() =>
          runValidationTasks("address_postalCode", address_postalCode)
        }
        errorMessage={errors.address_postalCode?.errorMessage}
        hasError={errors.address_postalCode?.hasError}
        {...getOverrideProps(overrides, "address_postalCode")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
