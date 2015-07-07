README for Pool 2

URL for the application:
URL for the git repository:

Introduction:
In this Pool 2 working prototype, we designed and built a web application to show the correlation of adverse drug event reports to recalls. We proceeded to show the top drugs with adverse reports since 2004. Then, we show the list of recalls for the drug against the timeline showing the adverse reports. It is interesting to see the positive and negative spikes correlation between the two graphs. In Sprint 2, we understood from our users that there is value in showing this correlation specifically for serious cases and serious recalls where disability or death is resulted.

Agile Team:
Our Agile project team consisted of Technical Architect, Front End Web Developer and DevOps Architect. Additionally, we had a user group, product owner and stakeholders.  The prototype's wireframes, look and feel and storyboarding, and finally its working functionality was achieved through an agile iterative delivery process where Sprint 1's product informed and groomed the requirements of the Sprint 2, but also within a sprint the user group, stakeholders, product owner and the project team participated collaboratively in continually refining and enhancing the sprint product. Using Rally, for requirements and test artifact management, we were able to trace that all objectives of a sprint were being met. Using a Configuration Management process that involved git, ant and linux scripts were a able to create continuous integration platform that included a snapshot of the sprint product along with accompanying requirements, test, build and deployment artifacts and other documentation. Thus, using an agile collaborative approach with our project team and users and a continuous integration platform we were able to deliver the working prototype with its requirements in two sprints.

Agile Approach:
This self contained agile team collaborated to create a quality release product that met the objectives for the working prototype. The ScrumMaster led the daily 15 minute scrum meeting with the other team members attending. The progress, status, roadblocks were discussed in the daily scrum in order to meet the objectives of the sprint. There were two planned sprints in the duration of the release - Sprint 1 for two weeks and Sprint 2 for one week. During the sprint planning sessions, the objectives of the sprint were discussed in order to distribute the release objectives in the two sprints. Each sprint consisted of requirements grooming, design, build, test and deploy stages. In the sprint retrospective, the subsequent sprint was planned and refined after a detailed review of the current sprint.

Technologies Used:
NodaVare used the following Open Source web technologies: i) Angular as the JavaScript for interfacing with openFDA over http(s) ii) Twitter Bootstrap for look and feel that adapts to various devices, browsers and platforms iii) HTML/CSS/JavaScript for custom web functions to supplement Angular and Bootstrap iv) C3/D3 for the interactive graphs and illustrations as used by openFDA as well v) Apache2 HTTPD for the web server to host the web application vi) Linux as the Operating System to host the web server and the application vii) JSON as the content format

Configuration Management
Our working prototype was built on a continuous integration platform using git, ant and linux scripts and accompanying SDLC artifacts so that the sprint and in turn the release product was baselined to know exactly what was being delivered and its quality. When developers worked on git and checked their code in, ant and linux scripts were fired through git handlers to update the development master copy. The ScrumMaster could look at the merged and collaborative development state on the development server. The web application development, test and product copies reside on separate Amazon AWS EC2 Linux instances. The ScrumMaster controls the promotion of code to test and production environments through approval of git versions that are pushed automatically through git handlers to these environments. This triggers off the ant and linux scripts to build, package and deploy the web application, interrogate the environments for its sanity and security checks, build the environments if necessary and finally conduct a series of automated testing that would generate a testing report to indicate the quality of the release

Build instructions:
In a Linux machine, install Apache 2 HTTPD or similar
$ sudo yum install httpd
Go to the /var/www/html directory
Clone the git repository
View the web page at the URL provided in the page above



