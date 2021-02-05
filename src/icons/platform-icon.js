import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

const InstrumentIcon = ({ color = "#FFF", size = "large" }) => (
  <svg
    viewBox="0 0 69 71"
    width={sizes[size].width}
    height={sizes[size].height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill={color} fillRule="nonzero">
      <path d="M66.962 42.064a2.476 2.476 0 01-.434-.23 3.66 3.66 0 00-2.91-.49 6.202 6.202 0 00-4.185-7.847v-.794c0-.73-.468-1.352-1.12-1.584v-1.434l5.247-2.099a.56.56 0 000-1.04l-5.599-2.24a.56.56 0 00-.482.032c-.212.12-.262.279-.286.498V31.119a1.682 1.682 0 00-1.12 1.584v.794a6.202 6.202 0 00-4.189 7.833 3.658 3.658 0 00-2.85.503c-.15.1-.312.184-.48.249a.56.56 0 10.405 1.044c.244-.094.478-.216.696-.361a2.528 2.528 0 012.776 0c.594.396 1.27.608 1.957.615a3.583 3.583 0 002.024-.615 2.462 2.462 0 012.738 0c.581.387 1.243.6 1.913.614a3.579 3.579 0 002.068-.614 2.528 2.528 0 012.776 0c.198.132.41.245.63.335a.56.56 0 00.425-1.036zm-8.649-13.585v-2.826l3.532 1.413-3.532 1.413zm-1.12 4.224a.56.56 0 011.12 0v.586a6.172 6.172 0 00-1.12 0v-.586zm3.894 9.556a2.473 2.473 0 01-1.315-.426 3.579 3.579 0 00-3.981 0 2.468 2.468 0 01-1.392.427 2.408 2.408 0 01-.975-.22 5.023 5.023 0 01-.71-2.58c0-2.8 2.26-5.077 5.04-5.077 2.778 0 5.039 2.277 5.039 5.077a5.02 5.02 0 01-.73 2.613 2.4 2.4 0 01-.976.186zM21.07 37.82l-1.655-1.91a2.113 2.113 0 00-1.6-.729h-5.897l-2.11-1.921a.617.617 0 00-.415-.16H6.596a.614.614 0 00-.535.31.602.602 0 00.012.614l.718 1.157H5.197l-1.624-3.119a.614.614 0 00-.545-.329H1.21a.61.61 0 00-.613.607v4.14c0 2.45 2.013 4.444 4.488 4.444h14.543c.75 0 1.412-.42 1.725-1.095a1.847 1.847 0 00-.284-2.01zm-2.586-1.12l.748.864h-.82a1.795 1.795 0 01-1.685-1.168h1.089c.257 0 .5.11.668.304zm-9.33-2.386l3.073 2.8H9.428l-1.736-2.8h1.462zm-7.33-1.366h.83l1.163 2.233H1.823v-2.233zm18.415 6.374a.658.658 0 01-.611.388H5.085c-1.799 0-3.262-1.449-3.262-3.23v-.084H7.543l1.02 1.642c.111.18.309.29.522.29H13.8c.253 0 .48-.154.571-.387a.603.603 0 00-.156-.667l-.964-.878h2.204a3.018 3.018 0 002.957 2.382h1.745a.62.62 0 00.086-.007c.08.173.08.368-.004.55zM39.22 6.76c0-3.736-3.002-6.76-6.712-6.76-3.709 0-6.711 3.023-6.711 6.76 0 2.095.707 3.147 1.88 4.892.712 1.06 1.578 2.349 2.612 4.324h-.832v3.154a1.84 1.84 0 001.83 1.844h2.441a1.84 1.84 0 001.83-1.844v-3.154h-.83c1.034-1.975 1.9-3.263 2.612-4.324 1.172-1.745 1.88-2.797 1.88-4.893zm-5.553-4.118c.433 1.09.672 2.552.672 4.117 0 1.825-.23 2.682-.69 4.388-.091.343-.193.72-.302 1.142H31.67c-.11-.422-.21-.8-.302-1.142-.459-1.706-.69-2.563-.69-4.388 0-1.565.24-3.027.672-4.117.341-.858.796-1.413 1.16-1.413.362 0 .817.555 1.158 1.413zm-6.65 4.117a5.53 5.53 0 013.455-5.139c-.09.176-.176.364-.256.566-.49 1.231-.759 2.856-.759 4.573 0 1.989.276 3.013.732 4.71l.218.82h-.845a68.449 68.449 0 00-.875-1.326c-1.112-1.655-1.67-2.485-1.67-4.204zm7.322 12.371a.613.613 0 01-.61.615h-2.441a.613.613 0 01-.61-.615v-1.925h3.66v1.925zm-2.676-3.154a42.591 42.591 0 00-1.345-2.458h4.38a42.591 42.591 0 00-1.345 2.458h-1.69zm3.792-3.687h-.846c.077-.295.15-.568.219-.82.456-1.697.73-2.721.73-4.71 0-1.717-.268-3.342-.757-4.573a6.466 6.466 0 00-.256-.566 5.53 5.53 0 013.454 5.14c0 1.718-.558 2.548-1.67 4.203-.26.388-.554.825-.874 1.326zM40.971 68.744c-.543 0-.788-.125-1.098-.284a4.593 4.593 0 00-.417-.194l1.662-4.477c.13-.348.108-.738-.059-1.07a1.292 1.292 0 00-.817-.669l-1.145-.306V58.23c0-.738-.586-1.338-1.306-1.338h-2.26v-1.3c0-1.035-.822-1.877-1.833-1.877H32.43c-1.011 0-1.834.842-1.834 1.877v1.3h-2.26c-.72 0-1.306.6-1.306 1.338v3.514l-1.145.306c-.352.094-.65.339-.817.67a1.345 1.345 0 00-.059 1.07l1.663 4.476c-.155.06-.29.13-.417.194-.31.159-.556.284-1.1.284a.498.498 0 00-.491.503c0 .279.22.504.492.504.775 0 1.18-.206 1.537-.388.31-.159.556-.284 1.099-.284.543 0 .788.125 1.099.284.357.182.762.388 1.537.388.775 0 1.18-.206 1.537-.388.31-.159.556-.284 1.099-.284.543 0 .788.125 1.098.284.358.182.763.388 1.538.388s1.18-.206 1.537-.388c.31-.159.555-.284 1.099-.284.543 0 .788.125 1.098.284.358.182.763.388 1.538.388a.498.498 0 00.492-.504.498.498 0 00-.493-.503zm-9.39-13.152c0-.48.38-.87.849-.87h1.268c.468 0 .85.39.85.87v1.3H31.58v-1.3zm-3.567 2.638c0-.182.145-.33.323-.33h9.454c.178 0 .322.148.322.33v3.25l-4.925-1.316a.482.482 0 00-.249 0l-4.925 1.317V58.23zm8.784 10.23c-.31.159-.555.284-1.098.284s-.788-.125-1.099-.284c-.357-.182-.762-.388-1.537-.388-.775 0-1.18.206-1.537.388-.31.159-.556.284-1.099.284-.543 0-.788-.125-1.099-.284-.357-.182-.762-.388-1.537-.388-.047 0-.094 0-.138.002l-1.724-4.643a.31.31 0 01.204-.406l6.93-1.853 6.93 1.853a.31.31 0 01.205.406l-1.725 4.643a4.18 4.18 0 00-.138-.002c-.775 0-1.18.206-1.538.388z" />
      <path d="M38.038 64.133l-4.467-1.237a.47.47 0 00-.251 0l-4.467 1.237a.53.53 0 00-.355.643c.07.281.34.45.606.376l4.342-1.203 4.34 1.203a.47.47 0 00.127.017c.22 0 .422-.157.48-.393a.53.53 0 00-.355-.643zM61.254 7.768L4.022 65c-.416.416-.53.974-.257 1.248.273.273.831.158 1.247-.258L62.244 8.758c.416-.416.531-.974.258-1.247-.274-.274-.832-.159-1.248.257z" />
      <path d="M62.244 65L5.012 7.768c-.416-.416-.974-.53-1.247-.257-.274.273-.159.831.257 1.247L61.254 65.99c.416.416.974.531 1.248.258.273-.274.158-.832-.258-1.248z" />
    </g>
  </svg>
)

InstrumentIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default InstrumentIcon
