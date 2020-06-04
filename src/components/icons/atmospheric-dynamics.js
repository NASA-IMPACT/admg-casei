import React from "react"

export const AtmosphericDynamics = ({ color = "#FFF" }) => (
  <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color}
      fillRule="nonzero"
      opacity=".9"
      d="M117.048 41.464c10.237 31.507-7.005 65.347-38.512 75.584-31.507 10.237-65.347-7.005-75.584-38.512-3.908-12.027-3.9-24.704-.19-36.491l.505-1.533 2.224.766a57.93 57.93 0 00-1.08 3.492c.801 1.057 1.6 1.99 2.394 2.8a1.176 1.176 0 11-1.68 1.647 28.843 28.843 0 01-1.427-1.572C1.516 57.537 1.97 67.9 5.19 77.81a57.435 57.435 0 0011.749 20.515c4.822-20.4 23.15-35.58 45.022-35.58 20.575 0 38.012 13.431 44.023 32.003a57.916 57.916 0 008.06-14.721 58.06 58.06 0 00-.832-1.445 1.176 1.176 0 011.822-1.453 57.311 57.311 0 001.423-28.737 26.425 26.425 0 01-3.106 2.558 1.176 1.176 0 11-1.343-1.93c1.26-.878 2.535-1.985 3.821-3.324a57.865 57.865 0 00-5.931-14.558c-1.96 2.326-3.927 4.03-5.914 5.105a1.176 1.176 0 11-1.12-2.068c1.798-.973 3.644-2.604 5.526-4.902.072-.087.153-.162.242-.223C94.866 7.386 67.73-3.109 42.19 5.19c-8.463 2.75-16.023 7.328-22.265 13.375l-1.23 1.228-1.688-1.639c6.734-6.93 15.063-12.149 24.456-15.201 31.507-10.237 65.347 7.005 75.584 38.512zM61.96 65.097c-21.308 0-39.071 15.178-43.068 35.312 10.677 10.846 25.381 17.155 40.793 17.237l1.298-2.284c.216-.506.292-.801.292-1.092 0-.188-.2-.662-.58-1.26a13.403 13.403 0 00-.651-.928l-.616-.77c-.197-.237-.384-.45-.546-.63l-.225-.242-.324-.81c0-1.999-.45-2.921-1.298-3.316-.684-.318-1.48-.378-3.406-.28l-1.754.097c-.45.021-.8.03-1.188.03-2.503 0-4.126-1.52-4.966-3.879a10.995 10.995 0 01-.542-2.385l-.06-.646a7.294 7.294 0 01-.017-.46l.02-.66c.023-.396.064-.884.132-1.444.19-1.555.53-3.111 1.067-4.578 1.32-3.614 3.607-6.116 7.065-6.842 4.106-.868 6.665-.484 7.974.895.35.37.565.754.681 1.116l.021.087.07.063c.858.68 2.09.867 3.84.64l.68-.105 1.15-.232 2.918-.689.963-.187.07-.674a40.43 40.43 0 00.175-2.96c.022-1.191-.035-2.18-.17-2.871l-.092-.378a.654.654 0 01-.032-.166l-.301.145c-3.542 1.576-6.76-.216-7.112-4.268-.258-2.892 2.499-5.076 7.14-6.942a43.822 43.822 0 014.317-1.459 43.863 43.863 0 00-13.718-2.185zm17.17 3.483a1.16 1.16 0 01-.661.41l-.594.14c-.363.09-.819.208-1.346.356-1.466.41-2.93.892-4.29 1.438-3.696 1.485-5.8 3.152-5.675 4.553.22 2.521 1.881 3.36 4.157 2.157 1.524-.8 2.724.06 3.2 1.67.287.97.389 2.308.359 3.96a39.137 39.137 0 01-.097 2.068l-.088 1.067c-.071.763-.142 1.366-.19 1.72a1.176 1.176 0 01-1.166 1.018c-.479 0-.861.052-1.915.294l-2.744.647c-.362.08-.69.144-1.023.202-2.793.49-4.916.258-6.511-1.107l-.422-.4-.325-.812-.146-.18c-.63-.665-2.391-.93-5.782-.213-2.545.535-4.273 2.426-5.34 5.349-.469 1.28-.773 2.666-.942 4.054a16.32 16.32 0 00-.135 1.82c0 .652.124 1.692.483 2.702.539 1.513 1.395 2.315 2.75 2.315l.703-.011 2.816-.144c1.874-.069 2.787.047 3.822.529 1.637.762 2.505 2.325 2.639 4.762l.004.211.24.27.657.787.348.445c.285.375.543.741.767 1.095.6.947.944 1.761.944 2.518 0 .762-.163 1.325-.606 2.303l-.641 1.024a57.682 57.682 0 0015.43-2.786l.203-.07c.203-.249.188-.383-.112-.692l-.681-.64c-.846-.786-1.244-1.35-1.244-2.235 0-.719.385-1.287 1.34-2.382l2.31-2.567c.993-1.14 1.725-2.098 2.249-2.99.689-1.175.941-2.087.765-2.807l-.062-.176-.52.166a6.624 6.624 0 01-1.1.212l-.547.027c-.86-.001-1.642-.227-2.28-.724l-.365-.332-.292-.539a30.124 30.124 0 00-.88-2.971c-.477-1.34-1.055-2.313-.913-2.313-.869 0-1.61-.69-1.359-1.666.103-.398.348-.722.716-1.068.574-.54 1.483-1.13 2.527-1.63 2.456-1.174 5.21-1.694 7.837-1.232l.372.081.326-.189c1.318-.851 2.453-2.074 3.413-3.596l.465-.785a20.92 20.92 0 001.724-4.133l.256-.913c.103-.403.17-.721.208-.933.026-.155.082-.298.161-.423a43.954 43.954 0 00-13.197-8.71zm15.106 10.654l-.056.214c-.065.243-.14.508-.225.79a23.235 23.235 0 01-1.922 4.6c-1.25 2.246-2.824 4.061-4.766 5.283l-.746.43-.847.096c-2.284-.602-4.83-.193-7.094.89-.336.16-.651.33-.933.5l-.342.213.139.165c.409.545.772 1.308 1.142 2.28l.224.607.361 1.088.416 1.439.078.302.192.093.256.06.302.021c.421 0 .911-.103 1.41-.278l.504-.201c.063-.03.115-.054.153-.075a1.176 1.176 0 011.403.23c1.653 1.742 1.473 3.966.019 6.444-.49.834-1.107 1.681-1.888 2.622l-1.076 1.24c-.662.738-1.659 1.83-1.852 2.052l-.612.734c-.064.074-.108.119-.13.124l.279.301.41.385c.842.774 1.358 1.367 1.461 1.984a57.324 57.324 0 0023.71-16.878 43.844 43.844 0 00-9.97-17.755zm-81.332-6.117c.531.373.659 1.107.285 1.638a59.593 59.593 0 00-4.01 6.56 1.176 1.176 0 01-2.082-1.095 61.945 61.945 0 014.168-6.818 1.176 1.176 0 011.639-.285zm92.575-8.192a62.295 62.295 0 015.316 5.968 1.176 1.176 0 11-1.854 1.449 59.942 59.942 0 00-5.114-5.743 1.176 1.176 0 111.652-1.674zm-81.812-3.12c.419.497.356 1.239-.14 1.658a59.966 59.966 0 00-5.544 5.329 1.176 1.176 0 11-1.736-1.588 62.318 62.318 0 015.762-5.538 1.176 1.176 0 011.658.14zm68.942-6.641a62.034 62.034 0 016.673 4.4 1.176 1.176 0 11-1.419 1.876 59.681 59.681 0 00-6.42-4.233 1.176 1.176 0 011.166-2.043zm-55.522-1.63a1.176 1.176 0 01-.561 1.565 59.479 59.479 0 00-6.724 3.729 1.176 1.176 0 01-1.271-1.98 61.83 61.83 0 016.99-3.875 1.176 1.176 0 011.566.56zm5.099-9.615c.33-.42.916-.573 1.42-.338l.232.142c.42.33.573.917.337 1.421l-3.015 6.47 6.47 3.02.23.141a1.177 1.177 0 01-1.225 1.99l-7.537-3.515-.232-.142a1.177 1.177 0 01-.337-1.42l3.515-7.538zM19.699 49.82a1.176 1.176 0 011.195 2.026c-1.429.843-2.628 1.397-3.864 1.746a9.652 9.652 0 01-4.628.103 1.176 1.176 0 01.509-2.297 7.282 7.282 0 003.496-.074c1-.283 2.023-.755 3.292-1.504zm58.115-.711a61.476 61.476 0 017.578 2.538 1.176 1.176 0 01-.89 2.177 59.123 59.123 0 00-7.289-2.44 1.176 1.176 0 01.6-2.275zm19.095.594a1.176 1.176 0 011.621-.372c1.672 1.047 3 1.679 4.115 1.939a9.88 9.88 0 002.438.261 1.176 1.176 0 01.044 2.352 12.233 12.233 0 01-3.016-.322c-1.416-.33-2.957-1.064-4.83-2.237a1.176 1.176 0 01-.372-1.621zM52 49.039a1.176 1.176 0 01-.942 1.37 59.163 59.163 0 00-7.454 1.886 1.176 1.176 0 11-.724-2.238 61.514 61.514 0 017.75-1.96 1.176 1.176 0 011.37.942zm9.96-1.977c2.683 0 5.346.171 7.976.51a1.176 1.176 0 01-.3 2.332 60.172 60.172 0 00-7.676-.49h-.054c-.999.002-1.994.027-2.986.077a1.176 1.176 0 11-.118-2.35 62.939 62.939 0 013.102-.079h.056zm-29.306-6.061a1.176 1.176 0 111.265 1.983 108.05 108.05 0 00-3.255 2.161l-3.171 2.226a1.176 1.176 0 11-1.363-1.917 194.6 194.6 0 014.564-3.173zm51.233-.387a1.176 1.176 0 011.624-.36 98.44 98.44 0 013.837 2.577l2.675 1.919a1.176 1.176 0 11-1.384 1.902c-1.934-1.408-3.45-2.478-4.92-3.457l-1.471-.957a1.176 1.176 0 01-.36-1.624zm-4.814-10.575l.1.253 2.152 8.033a1.177 1.177 0 01-.58 1.34l-.252.1-8.033 2.153a1.176 1.176 0 01-.861-2.172l.252-.1 5.188-1.393a44.587 44.587 0 00-6.702-2.49 1.176 1.176 0 11.634-2.265c2.544.711 5.039 1.66 7.523 2.838l-.159-.073-1.435-5.362a1.177 1.177 0 01.58-1.341l.252-.1a1.177 1.177 0 011.34.58zm-32.056 3.99a1.176 1.176 0 01.712 2.241c-2.38.756-4.733 1.721-7.096 2.89a1.176 1.176 0 11-1.043-2.108c2.466-1.22 4.929-2.23 7.427-3.024zm-20.434-1.65a1.176 1.176 0 111.432 1.867c-2.117 1.625-3.66 2.565-5.252 3.083a7.605 7.605 0 01-2.793.3 1.176 1.176 0 11.19-2.345 5.219 5.219 0 001.904-.2c1.248-.407 2.596-1.229 4.519-2.704zm61.901-1.831a1.176 1.176 0 011.657-.148c2.976 2.488 4.65 3.702 6.122 4.333a1.176 1.176 0 11-.927 2.162c-1.464-.628-2.952-1.634-5.234-3.479l-1.47-1.211a1.176 1.176 0 01-.148-1.657zM59.98 31.974c1.015 0 2.023.038 3.024.113a1.176 1.176 0 01-.177 2.346 37.87 37.87 0 00-2.847-.107c-1.546 0-3.078.092-4.599.273a1.176 1.176 0 01-.278-2.336 41.266 41.266 0 014.877-.29zM7.993 24.552c.253-.47.803-.723 1.341-.579l8.033 2.153.253.1c.47.252.723.802.58 1.34l-.1.253c-.253.47-.804.723-1.341.579l-5.841-1.564c1.135 1.921 2.262 3.518 3.38 4.79a1.176 1.176 0 11-1.767 1.553c-1.087-1.237-2.167-2.732-3.242-4.486l-1.276 4.756-.1.252a1.177 1.177 0 01-2.172-.86l2.153-8.034zm31.085-1.83a1.176 1.176 0 011.297 1.962c-1.995 1.32-3.945 2.772-6.22 4.596a1.176 1.176 0 01-1.471-1.835c2.327-1.865 4.33-3.359 6.394-4.723zm36.778-1.47a1.176 1.176 0 011.611-.415c2.174 1.283 4.304 2.767 6.579 4.54a1.176 1.176 0 11-1.446 1.855c-2.2-1.715-4.25-3.143-6.328-4.37a1.176 1.176 0 01-.416-1.61zm-22.015-4.947a1.176 1.176 0 01.457 2.307c-2.432.481-4.825 1.265-7.21 2.332a1.176 1.176 0 11-.96-2.147c2.54-1.137 5.101-1.975 7.713-2.492zm8.01-.543l.129.001c2.722.179 5.376.719 7.985 1.594a1.176 1.176 0 01-.748 2.23 29.095 29.095 0 00-7.39-1.476 1.176 1.176 0 01.153-2.348z"
    />
  </svg>
)
