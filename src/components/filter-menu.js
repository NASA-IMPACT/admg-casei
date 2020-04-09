import React from "react"

const Filter = ({ id, label, name }) => (
  <li
    style={{ display: `flex`, flexDirection: `column`, marginRight: `0.5rem` }}
  >
    <label htmlFor={id}>{label}</label>

    <select name={name} id={id}>
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </li>
)

const FilterMenu = () => {
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-around`,
        alignItems: `baseline`,
        marginBottom: `2rem`,
      }}
    >
      <ul
        style={{
          display: `flex`,
          flexDirection: `row`,
          margin: 0,
          listStyle: `none`,
        }}
      >
        <Filter id="topic" label="Topic" name="topic" />
        <Filter id="season" label="Season" name="season" />
      </ul>
    </div>
  )
}

export default FilterMenu
