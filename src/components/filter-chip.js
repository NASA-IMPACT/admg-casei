import React from "react"
import { Button } from "@devseed-ui/button"

const FilterChip = ({ id, label, removeFilter }) => (
  <div
    style={{
      backgroundColor: `#efefef`,
      borderRadius: `1rem`,
      padding: `0 0.5rem`,
      margin: `0 0 0.5rem 0.5rem`,
    }}
  >
    <Button
      variation="base-plain"
      size="small"
      title="filter"
      onClick={() => removeFilter(id)}
      style={{}}
    >
      🆇
    </Button>
    <small>{label}</small>
  </div>
)

export default FilterChip
