import React from "react"

import PropTypes from "prop-types"
import { Formik, Field, Form, ErrorMessage } from "formik"
import {
  FormFieldset,
  FormFieldsetBody,
  FormGroup,
  FormGroupHeader,
  FormGroupBody,
  FormInput,
  FormLabel,
  FormHelper,
  FormHelperMessage,
} from "@devseed-ui/form"

import theme from "../../../utils/theme"

const InputGroup = ({ id, label, placeholder, helperMessage }) => (
  <FormGroup>
    <FormGroupHeader>
      <FormLabel htmlFor={id}>{label}</FormLabel>
    </FormGroupHeader>
    <FormGroupBody>
      <Field
        as={FormInput}
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
      />
      <FormHelper>
        {helperMessage && (
          <FormHelperMessage>{helperMessage}</FormHelperMessage>
        )}
        <FormHelperMessage as={ErrorMessage} name={id} />
      </FormHelper>
    </FormGroupBody>
  </FormGroup>
)

InputGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helperMessage: PropTypes.string.isRequired,
}

const HeaderForm = ({
  bounds,
  shortname,
  longname,
  focusListing,
  countDeployments,
  countCollectionPeriods,
  countDataProducts,
}) => {
  return (
    <>
      <h2>Header Data</h2>
      <Formik
        initialValues={{
          bounds,
          shortname,
          longname,
          focusListing,
          countDeployments,
          countCollectionPeriods,
          countDataProducts,
        }}
        onSubmit={(values, actions) => {
          console.log("submitting", values, actions)
        }}
      >
        <Form>
          <FormFieldset>
            <FormFieldsetBody>
              <InputGroup
                id="shortname"
                label="Short Name"
                placeholder="Campaign Short Name"
                helperMessage="campaign abbreviation or code"
              />
              <InputGroup
                id="longname"
                label="Long Name"
                placeholder="Campaign Long Name"
                helperMessage="official campaign name"
              />
              <InputGroup
                id="bounds"
                label="Bounds"
                placeholder="Geographic Bounds"
                helperMessage="geographic bounds"
              />
              <InputGroup
                id="focusListing"
                label="Focus Listing"
                placeholder="Focus Listing"
                helperMessage="list of campaign focuses"
              />
              <InputGroup
                id="countDeployments"
                label="Deployment Count"
                placeholder="Deployment Count"
                helperMessage="number of recorded deployments"
              />
              <InputGroup
                id="countCollectionPeriods"
                label="Collection Period Count"
                placeholder="Number of collection periods"
                helperMessage="number of collection periods"
              />
              <InputGroup
                id="countDataProducts"
                label="Data Product Count"
                placeholder="Number of data products"
                helperMessage="number of data products"
              />
              <InputGroup
                id="countDataProducts"
                label="Data Product Count"
                placeholder="Number of data products"
                helperMessage="number of data products"
              />
              <button
                type="submit"
                style={{
                  border: `1px solid ${theme.color.base}`,
                  backgroundColor: `${theme.color.primary}`,
                  color: `${theme.color.base}`,
                  padding: `1rem 5rem`,
                  textTransform: `uppercase`,
                  cursor: `pointer`,
                }}
              >
                Submit Changes
              </button>
            </FormFieldsetBody>
          </FormFieldset>
        </Form>
      </Formik>
    </>
  )
}

HeaderForm.propTypes = {
  bounds: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
}

export default HeaderForm
