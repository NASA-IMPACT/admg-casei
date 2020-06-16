import React from "react"
import PropTypes from "prop-types"

export const ClimateVariabilityChange = ({ color = "#FFF" }) => (
  <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color}
      fillRule="nonzero"
      opacity=".9"
      d="M69.385.747c32.724 5.183 55.05 35.913 49.868 68.638-5.183 32.724-35.913 55.05-68.638 49.868-12.494-1.98-23.473-7.682-31.983-15.799a1.155 1.155 0 01-.268-.258C4.758 90.059-2.436 70.713.747 50.616 2.726 38.122 8.49 26.83 17.147 18.01l1.145-1.137 1.634 1.693c-8.93 8.624-14.871 19.89-16.855 32.416-2.367 14.946 1.238 29.46 9.05 41.109a9.398 9.398 0 002.237.264c2.318 0 4.363-.88 6.13-2.365 1.072-.9 1.8-1.798 2.151-2.361a1.18 1.18 0 011.009-.555l.247.027c.322.069.604.271.772.563.319.553 1.005 1.44 2.047 2.333 1.727 1.479 3.793 2.358 6.226 2.358 2.319 0 4.365-.88 6.13-2.365 1.072-.9 1.8-1.798 2.151-2.36.215-.346.592-.556.999-.556.477 0 2.625 2.235 3.527 2.929 1.665 1.28 3.385 2.115 5.112 2.364l.002-.015.339.056c.337.033.675.044 1.013.031 2.095-.132 4.045-.915 5.774-2.44 1.023-.9 1.737-1.801 2.09-2.37.215-.345.593-.555 1-.555.55 0 2.314 2.271 3.076 2.923 1.73 1.48 3.796 2.358 6.229 2.358 2.317 0 4.363-.88 6.13-2.365 1.071-.9 1.8-1.798 2.15-2.361a1.18 1.18 0 011.01-.555l.247.027c.321.069.604.271.772.563.318.553 1.004 1.44 2.047 2.333 1.726 1.479 3.793 2.358 6.226 2.358 2.318 0 4.364-.88 6.13-2.365 1.072-.9 1.8-1.798 2.15-2.36.215-.346.593-.556 1-.556l.274.03c.259.06.492.206.66.418.473.601 1.374 1.541 2.594 2.48 1.913 1.473 3.9 2.356 5.886 2.436 4.647-6.814 7.896-14.737 9.271-23.422C121.91 37.576 100.458 8.05 69.017 3.07c-8.79-1.392-17.606-.745-25.914 1.809l-1.654.536-.76-2.227C49.837.07 59.63-.798 69.386.747zM42.312 110.624l-.3.34c-.401.438-.877.901-1.428 1.364-.569.478-1.166.907-1.79 1.28a57.726 57.726 0 0012.19 3.321c10.993 1.741 21.753.25 31.311-3.768-.374-.26-.737-.54-1.088-.84l-.518-.466a13.72 13.72 0 01-.881-.91l-.164-.196-.191.215c-.402.438-.878.901-1.428 1.364-2.161 1.816-4.719 2.916-7.643 2.916-3.039 0-5.629-1.101-7.759-2.923l-.703-.645a13.581 13.581 0 01-.631-.665l-.215-.262-.437.492a15.94 15.94 0 01-1.094 1.06c-2.464 2.172-5.373 3.465-8.603 2.988-2.306-.23-4.533-1.274-6.626-2.886l-.786-.638-.729-.657-.487-.484zm56.024-10.27l-.3.342c-.402.438-.878.901-1.428 1.364-2.16 1.816-4.718 2.916-7.644 2.916-3.039 0-5.63-1.102-7.757-2.923l-.518-.465c-.328-.31-.622-.615-.881-.91l-.164-.198-.191.216c-.402.438-.878.901-1.428 1.364-2.161 1.816-4.719 2.916-7.643 2.916-3.039 0-5.629-1.101-7.759-2.923l-.703-.645a13.586 13.586 0 01-.631-.665l-.21-.259-.442.489a15.94 15.94 0 01-1.094 1.06c-2.602 2.295-5.717 3.622-9.164 2.905l.23.044c-2.188-.293-4.303-1.312-6.295-2.846l-.786-.639a19.68 19.68 0 01-.729-.657l-.487-.485-.3.341c-.401.438-.877.901-1.428 1.364-2.16 1.816-4.718 2.916-7.644 2.916-3.038 0-5.629-1.102-7.756-2.923l-.518-.465c-.328-.31-.622-.615-.882-.91l-.163-.198-.192.216a15.244 15.244 0 01-2.194 1.965 57.292 57.292 0 0014.673 9.717c1.138-.403 2.193-1.036 3.163-1.851 1.071-.9 1.8-1.798 2.15-2.361.143-.23.568-.405 1.274-.525.258.06.491.206.659.418.473.6 1.374 1.54 2.595 2.48 1.665 1.282 3.386 2.117 5.113 2.362l.053.01a7.329 7.329 0 002.227-.032l.28-.055c1.64-.313 3.173-1.06 4.565-2.288 1.023-.9 1.737-1.802 2.09-2.37.215-.345.593-.555 1-.555.55 0 2.314 2.27 3.076 2.922 1.73 1.48 3.796 2.358 6.229 2.358 2.317 0 4.363-.88 6.13-2.364 1.071-.901 1.8-1.799 2.15-2.362a1.18 1.18 0 011.01-.554l.247.026c.321.07.604.272.772.563.318.553 1.004 1.441 2.047 2.334.644.552 1.325 1.083 2.057 1.506a58 58 0 0015.003-10.342l-.246-.2a19.68 19.68 0 01-.73-.658l-.486-.485zm0-10.268l-.3.342c-.402.438-.878.902-1.428 1.364-2.16 1.816-4.718 2.916-7.644 2.916-3.039 0-5.63-1.101-7.757-2.923l-.518-.465c-.328-.31-.622-.615-.881-.91l-.164-.199-.191.218c-.402.438-.878.9-1.428 1.363-2.161 1.816-4.719 2.916-7.643 2.916-3.039 0-5.629-1.1-7.759-2.922l-.703-.645a13.581 13.581 0 01-.631-.666l-.215-.26-.437.49a15.94 15.94 0 01-1.094 1.06c-2.466 2.174-5.387 3.467-8.62 2.987-2.299-.234-4.52-1.276-6.61-2.884l-.786-.637-.73-.657-.485-.484-.3.338c-.401.438-.877.902-1.428 1.364-2.16 1.816-4.718 2.916-7.644 2.916-3.038 0-5.629-1.101-7.756-2.923l-.518-.465c-.328-.31-.622-.615-.882-.91l-.163-.199-.192.218c-.401.438-.877.9-1.428 1.363-2.16 1.816-4.718 2.916-7.643 2.916-.127 0-.253-.002-.379-.006a57.861 57.861 0 005.513 6.308c.342-.23.674-.48.996-.751 1.072-.9 1.8-1.798 2.151-2.361a1.18 1.18 0 011.009-.555l.247.026c.322.07.604.272.772.564.319.553 1.005 1.44 2.047 2.333 1.727 1.479 3.793 2.357 6.226 2.357 2.319 0 4.365-.88 6.13-2.364 1.072-.9 1.8-1.798 2.151-2.361a1.18 1.18 0 011.009-.555l.265.03c.258.06.491.206.659.418.473.601 1.374 1.54 2.595 2.48 1.657 1.277 3.371 2.11 5.092 2.362l.017.001c.5.073.997.096 1.493.067 2.055-.179 3.945-.941 5.636-2.432 1.023-.901 1.737-1.803 2.09-2.37.215-.346.593-.556 1-.556.55 0 2.314 2.271 3.076 2.923 1.73 1.479 3.796 2.357 6.229 2.357 2.317 0 4.363-.88 6.13-2.364 1.071-.9 1.8-1.798 2.15-2.361a1.18 1.18 0 011.01-.555l.247.026c.321.07.604.272.772.564.318.553 1.004 1.44 2.047 2.333 1.726 1.479 3.793 2.357 6.226 2.357 2.318 0 4.364-.88 6.13-2.364 1.072-.9 1.8-1.798 2.15-2.361.215-.345.593-.555 1-.555l.274.03c.259.06.492.206.66.418.433.55 1.225 1.385 2.293 2.243a57.29 57.29 0 004.622-5.407c-1.997-.378-3.928-1.352-5.756-2.759l-.785-.638a19.68 19.68 0 01-.73-.658l-.486-.486zm-9.164-26.103c.042 0 .084.002.124.006l.017.002a1.166 1.166 0 01.57.231l.034.028-.004-.004.031.026-.026-.021.074.066.011.01 6.418 6.418.168.212a1.177 1.177 0 01-.168 1.451l-.213.17a1.177 1.177 0 01-1.45-.17l-4.41-4.414v17.7l-.031.27a1.177 1.177 0 01-2.322-.27l.001-17.698-4.41 4.412-.213.17a1.177 1.177 0 01-1.45-1.833l6.417-6.418.01-.01c.057-.055.12-.105.187-.148l.016-.01.02-.012a1.228 1.228 0 01.107-.057c.15-.069.316-.107.492-.107zm-17.969 0c.043 0 .085.002.127.007l.012.001a1.158 1.158 0 01.573.232l.024.018.012.01.008.007.017.015.047.044.012.01 6.417 6.418.169.212a1.177 1.177 0 01-.169 1.451l-.213.17a1.177 1.177 0 01-1.45-.17l-4.409-4.415v17.702l-.032.27a1.177 1.177 0 01-2.321-.27V67.998l-4.41 4.41-.212.17a1.177 1.177 0 01-1.451-1.833l6.417-6.418c.065-.063.128-.114.197-.158l.016-.01a1.22 1.22 0 01.084-.047l.04-.02c.15-.07.318-.11.495-.11zM32.383 8.63a4.586 4.586 0 014.58 4.37l.005.216v22.445l.478.36a7.975 7.975 0 012.875 5.22l.03.297.027.66a7.996 7.996 0 01-15.99 0 7.968 7.968 0 012.707-5.987l.224-.19.474-.36.004-22.445a4.587 4.587 0 013.872-4.53l.214-.029.5-.027zm11.933 34.097c.557 0 1.023.387 1.145.906l.031.27v3.41a1.176 1.176 0 01-2.321.27l-.031-.27v-3.41c0-.65.526-1.176 1.176-1.176zM32.383 10.984c-1.18 0-2.146.915-2.228 2.074l-.006.16v23.085c0 .42-.223.808-.587 1.019a5.63 5.63 0 00-2.822 4.877 5.643 5.643 0 0011.285 0 5.63 5.63 0 00-2.822-4.877 1.176 1.176 0 01-.579-.88l-.008-.139V13.217c0-1.233-1-2.233-2.233-2.233zm0 9.582c.556 0 1.023.387 1.145.906l.03.27.001 17.827a2.883 2.883 0 01-1.176 5.511 2.883 2.883 0 01-1.176-5.512V21.743c0-.65.526-1.176 1.176-1.176zM55.6 38.486l.213.169 2.413 2.41a1.176 1.176 0 01-1.45 1.833l-.213-.169-2.413-2.41a1.176 1.176 0 011.45-1.833zM44.316 16.259c6.77 0 12.257 5.487 12.257 12.257s-5.487 12.257-12.257 12.257c-.94 0-1.865-.105-2.762-.313a1.176 1.176 0 01.532-2.292 9.86 9.86 0 002.23.253c5.47 0 9.905-4.435 9.905-9.905s-4.435-9.905-9.905-9.905a9.889 9.889 0 00-2.976.454 1.176 1.176 0 11-.707-2.244 12.241 12.241 0 013.683-.562zm18.753 11.126a1.176 1.176 0 01.27 2.321l-.27.031h-3.41a1.176 1.176 0 01-.27-2.321l.27-.031h3.41zm-4.692-12.84c.393.393.45.997.168 1.45l-.168.213-2.41 2.41a1.176 1.176 0 01-1.833-1.45l.169-.213 2.41-2.41c.46-.46 1.204-.46 1.664 0zm-14.06-5.913c.556 0 1.022.387 1.144.907l.031.27v3.41a1.176 1.176 0 01-2.321.269l-.031-.27v-3.41c0-.65.526-1.176 1.176-1.176z"
    />
  </svg>
)

ClimateVariabilityChange.propTypes = {
  color: PropTypes.string,
}
