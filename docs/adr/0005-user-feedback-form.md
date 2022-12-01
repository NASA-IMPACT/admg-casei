# 5. User Feedback Form

- **Status:** Ideas proposed by Eli Walker @EJwalker13 with added content from Heidi Mok @heidimok
- **Deciders:** Stephanie @smwingo Deborah @deborahUAH
- **Date:** 2022-12-1
- **Technical Story:** [#434](https://github.com/NASA-IMPACT/admg-casei/issues/478)


# CASEI User Interface Feedback Tools

IMPACT (ADMG) & DevSeed Task

**Vision:** ADMG’s goal for the CASEI User Interface is to develop a website containing capabilities to browse, search, and discover airborne and field data. Other intuitive capabilities consist of organized/inter-linked metadata and integrated exploration across all NASA DAACs. Within a single multi-parameter search researchers are able to access campaign science objectives, platform/instrument configurations, geographical details, geophysical concepts across CASEI’s vast database. Finally, CASEI will connect researchers to associated data products through DOI links regardless of the DAAC where they reside.

**Issue:** Once CASEI evolves from the BETA stage it will be an intuitive information system yet it still needs to remain user-friendly and evolve based on the research communities’ needs. 

**Solution:** ADMG along with DevSeed will provide users with a helpful tool to assist community questions, ideas, and feedback.


# Current Feedback Tool

Upon visiting CASEI and clicking on the Contact page, a feedback link opens a popup (which is the Kayako form). It asks how ADMG can help you pertaining to a subject then users can provide their details in the text box. Then ADMG can also reach out to the individual user by providing their email. Plus the Choose File is a great feature because users can submit photo ideas or possibly screen capture an issue they found on the User Interface.

However, the Kayako solution is NO LONGER a desirable solution. After an update it no longer met security requirements and in general the team found that it wasn't a reliably working solution for them.

![image](https://user-images.githubusercontent.com/10764915/205165031-d75e34c7-b932-41bb-a393-f313f2e7c694.png)
![image](https://user-images.githubusercontent.com/10764915/205165067-3b252457-3c4a-42c1-a2a4-b88751c209b4.png)



# Options

### Google Form
- Replace the existing Kayako form with a Google form
- Currently used on APT - Was simple to set up, since ADMG is already on Google
- Question: Is this be a longer term and sustainable solution?
- Would need a process for who checks the feedback and how does it translate into improvements

### Support Automation
- Develop a help desk bot that can quickly resolve queries with Automatic FAQs, run feedback surveys, or direct users to human support.
- CASEI Assistant? Possibly having a helpdesk bot popup while users are browsing the website like the icon below. If users want to provide feedback or find an issue they can have an automated assistant to record their feedback. 
- Example python script if we wanted to look into it. https://realpython.com/build-a-chatbot-python-chatterbot/
- Question: How will the chatbot be meaningfully different from the current FAQ? Are we just repackaging that content?
- Question: Do we want to spend the time designing a natural language interface (with branching, etc)? Will it improve the UX over simply reading the FAQ?
- Question: Do we have data indicating that chatbots improve UX on a purely informational site (vs ecommerce or whatever)?
- Question: Are we confident that we can currently craft the correct questions to get meaningful insight into user needs or would it be more helpful to, e.g., direct users to an open-ended feedback form if they've been on the site for more than a few minutes?
- Question: Would we have the people power to provide a live human to respond in real-time as a fallback to the chatbot?


### Survey Tool - Survicate
- An application called Survicate that does the above. They do charge for different packages but they have a really great free option as well which will allow an email/survey to be sent out to users who view CASEI.
- Website: https://survicate.com/ 
- We learned that NASA cannot had surveys on websites, we can only get feedback and answer questions


### CASEI Community Forum
- Add another page on CASEI containing a public discussion forum. We can have people add their feedback related to the CASEI UI and then have a categorized subject where users can tag if it is related to an issue, bug, help, idea, etc. 
- Tagging Categories: Issue, Bug, Help, Idea
- Mock up idea below… 
- ![image](https://user-images.githubusercontent.com/10764915/205163283-a6aa1192-8862-443f-8387-376da6eead32.png)
- EarthData forum exists. If we wanted a forum for CASEI, it would have to work within an EarthData forum.



# Decision Outcome
Recommended staying with a Google Form solution because it's doesn't have compliance issues and is something already done on the APT project so we know it will work and be viable for the timeline we currently have. Since ADMG uses Google already it also makes it easy for permissions. https://github.com/NASA-IMPACT/admg-casei/issues/478

If the ADMG would like to explore additional options to go in conjunction with a simple form, the team can work through some of the pros/cons mentioned.





