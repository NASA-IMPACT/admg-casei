import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion"

export default function AccordionComp() {
  return (
    <Accordion>
      <AccordionItem>
        <h3>
          <AccordionButton>Step 1: Do a thing</AccordionButton>
        </h3>
        <AccordionPanel>
          Here are some detailed instructions about doing a thing. I am very
          complex and probably contain a lot of content, so a user can hide or
          show me by clicking the button above.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Step 2: Do another thing</AccordionButton>
        </h3>
        <AccordionPanel>
          Here are some detailed instructions about doing yet another thing.
          There are a lot of things someone might want to do, so I am only going
          to talk about doing that other thing. I'll let my fellow accordion
          items go into detail about even more things.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
