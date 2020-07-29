import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Formik, Field, Form as FormikForm } from "formik"
import { themeVal } from "@devseed-ui/theme-provider"
import {
  FormFieldset,
  FormFieldsetBody,
  FormGroup,
  FormGroupHeader,
  FormGroupBody,
  FormLabel,
  FormHelper,
  FormHelperMessage,
} from "@devseed-ui/form"

const Form = styled(FormikForm)`
  display: grid;
  grid-template-rows: auto;
  grid-gap: ${themeVal("layout.space")};
`

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
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500))
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Form>
          <FormFieldset>
            <FormFieldsetBody>
              <FormGroup>
                <FormGroupHeader>
                  <FormLabel htmlFor="shortname">Campaign Short Name</FormLabel>
                </FormGroupHeader>
                <FormGroupBody>
                  <Field
                    id="shortname"
                    name="shortname"
                    placeholder="Campaign Short Name"
                  />
                  <FormHelper>
                    <FormHelperMessage>
                      This is a helper text.
                    </FormHelperMessage>
                  </FormHelper>
                </FormGroupBody>
              </FormGroup>
              <button type="submit">Submit Changes</button>
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
