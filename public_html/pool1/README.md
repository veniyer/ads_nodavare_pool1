README for Pool 1

URL for the application:
URL for the git repository:

Introduction:
 In this Pool 1 working prototype, we designed and built a web application to show the top devices with adverse reports since 2004. Further, you are able to see the top operators who were using the device at the time of the adverse event that may have caused the report. We understand from our user group that such graphs help view, understand and analyze the correlation between adverse reports on devices and its user and thus its use. We are hoping that in further sprints we can drill down further into what were the different effects of the adverse event on the operator, eg Hospitalization, Death etc.
Agile Team:
NodaVare assigned a Product Manager (SME for Rich Interactive Applications, Human-Centered Applications) that was responsible for solutions delivery to meet the objectives of the prototype. The project team consisted of the Product Manager who also served as the ScrumMaster, Content Designer and Front End Web Designer. The Product Manager was assigned the authority and responsibility to deliver a quality release product. The Product Manager led appropriate Release Planning, Requirements Gathering, Design, Build, Test, Deploy activities for the successful implementation of the prototype, as well as additional responsibility for Configuration Management, Continuous Integration, Continuous Monitoring, Documentation for a complete quality release product. Thus, at the end of the product release which included multiple sprints, the Product Manager was able to deliver a quality product that met the objectives of the release plan by following a software development life cycle process that measured metrics for product quality along its path.
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



