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
    authorID: "",
    pestActual: undefined,
    pestSubmitted: undefined,
    pestIdentified: undefined,
    image: "",
  };
  const [authorID, setAuthorID] = React.useState(initialValues.authorID);
  const [pestActual, setPestActual] = React.useState(initialValues.pestActual);
  const [pestSubmitted, setPestSubmitted] = React.useState(
    initialValues.pestSubmitted
  );
  const [pestIdentified, setPestIdentified] = React.useState(
    initialValues.pestIdentified
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAuthorID(initialValues.authorID);
    setPestActual(initialValues.pestActual);
    setPestSubmitted(initialValues.pestSubmitted);
    setPestIdentified(initialValues.pestIdentified);
    setImage(initialValues.image);
    setErrors({});
  };
  const validations = {
    authorID: [{ type: "Required" }],
    pestActual: [{ type: "Required" }],
    pestSubmitted: [],
    pestIdentified: [],
    image: [{ type: "URL" }],
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
          authorID,
          pestActual,
          pestSubmitted,
          pestIdentified,
          image,
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
      <TextField
        label="Author id"
        isRequired={true}
        isReadOnly={false}
        value={authorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              authorID: value,
              pestActual,
              pestSubmitted,
              pestIdentified,
              image,
            };
            const result = onChange(modelFields);
            value = result?.authorID ?? value;
          }
          if (errors.authorID?.hasError) {
            runValidationTasks("authorID", value);
          }
          setAuthorID(value);
        }}
        onBlur={() => runValidationTasks("authorID", authorID)}
        errorMessage={errors.authorID?.errorMessage}
        hasError={errors.authorID?.hasError}
        {...getOverrideProps(overrides, "authorID")}
      ></TextField>
      <SelectField
        label="Pest actual"
        placeholder="Please select an option"
        isDisabled={false}
        value={pestActual}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              authorID,
              pestActual: value,
              pestSubmitted,
              pestIdentified,
              image,
            };
            const result = onChange(modelFields);
            value = result?.pestActual ?? value;
          }
          if (errors.pestActual?.hasError) {
            runValidationTasks("pestActual", value);
          }
          setPestActual(value);
        }}
        onBlur={() => runValidationTasks("pestActual", pestActual)}
        errorMessage={errors.pestActual?.errorMessage}
        hasError={errors.pestActual?.hasError}
        {...getOverrideProps(overrides, "pestActual")}
      >
        <option
          children="Unknown"
          value="UNKNOWN"
          {...getOverrideProps(overrides, "pestActualoption0")}
        ></option>
        <option
          children="Grape berry moth"
          value="GRAPE_BERRY_MOTH"
          {...getOverrideProps(overrides, "pestActualoption1")}
        ></option>
        <option
          children="Spotted lantern fly"
          value="SPOTTED_LANTERN_FLY"
          {...getOverrideProps(overrides, "pestActualoption2")}
        ></option>
      </SelectField>
      <SelectField
        label="Pest submitted"
        placeholder="Please select an option"
        isDisabled={false}
        value={pestSubmitted}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              authorID,
              pestActual,
              pestSubmitted: value,
              pestIdentified,
              image,
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
      <SelectField
        label="Pest identified"
        placeholder="Please select an option"
        isDisabled={false}
        value={pestIdentified}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              authorID,
              pestActual,
              pestSubmitted,
              pestIdentified: value,
              image,
            };
            const result = onChange(modelFields);
            value = result?.pestIdentified ?? value;
          }
          if (errors.pestIdentified?.hasError) {
            runValidationTasks("pestIdentified", value);
          }
          setPestIdentified(value);
        }}
        onBlur={() => runValidationTasks("pestIdentified", pestIdentified)}
        errorMessage={errors.pestIdentified?.errorMessage}
        hasError={errors.pestIdentified?.hasError}
        {...getOverrideProps(overrides, "pestIdentified")}
      >
        <option
          children="Unknown"
          value="UNKNOWN"
          {...getOverrideProps(overrides, "pestIdentifiedoption0")}
        ></option>
        <option
          children="Grape berry moth"
          value="GRAPE_BERRY_MOTH"
          {...getOverrideProps(overrides, "pestIdentifiedoption1")}
        ></option>
        <option
          children="Spotted lantern fly"
          value="SPOTTED_LANTERN_FLY"
          {...getOverrideProps(overrides, "pestIdentifiedoption2")}
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
              authorID,
              pestActual,
              pestSubmitted,
              pestIdentified,
              image: value,
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
