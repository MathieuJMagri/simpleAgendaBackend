/**
 * Returns a text file equivalent string of the HTML About Page.
 * Has the option to add in an extra string at the bottom should
 * one need to, say, display listener port data.
 * Not the most maintainable solution for sending an HTML page but
 * does not require changing up the configuration of our project
 * for serving static resources of which there is only one time
 * we need to search static resources: this about page.
 * @param {*} extrafooter 
 * @returns 
 */
export const getAboutHTML = (extrafooter="") => {
    let page = "";
    page = page + "<!DOCTYPE html>\n";
    page = page + "<html>\n";
    page = page + "<head>\n";
    page = page + "    <title>TodoList Backend - McGill ECSE428 Fall 2021 Team 7</title>\n";
    page = page + "</head>\n";
    page = page + "\n";
    page = page + "<body>\n";
    page = page + "    <div>\n";
    page = page + "        <h1>\n";
    page = page + "            McGill University ECSE 428 Fall 2021 Team 7\n";
    page = page + "        </h1>\n";
    page = page + "        <h2>\n";
    page = page + "            <ul>\n";
    page = page + "            <li>Charles Liu</li>\n";
    page = page + "            <li>Edwin Pan</li>\n";
    page = page + "            <li>Ezra Gomolin</li>\n";
    page = page + "            <li>Francis Comeau</li>\n";
    page = page + "            <li>Jeffery Tang</li>\n";
    page = page + "            <li>Liang Zhao</li>\n";
    page = page + "            <li>Mathieu-Joseph Magri</li>\n";
    page = page + "            <li>Talha Riaz</li>\n";
    page = page + "            <li>Yujie Qin</li>\n";
    page = page + "            <li>Amine Mallek</li>\n";
    page = page + "            </ul>\n";
    page = page + "        </h2>\n";
    page = page + "        <p>\n";
    page = page + "            This app was developed by a team of 10 students in the Electrical and\n";
    page = page + "            Computer Engineering Department at McGill University. It is part of a\n";
    page = page + "            group project for the ECSE 428 Software Engineering Practice course. The\n";
    page = page + "            app designed to help students with their organization strategy in\n";
    page = page + "            academics featuring adding, editing, and deletion of courses and tasks \n";
    page = page + "            and a login system tailouring these lists to each student. The app is \n";
    page = page + "            developed in javascript with a reactjs frontend and an expressjs backend\n";
    page = page + "            with the code split respectively into two github repositories with GitHub\n";
    page = page + "            actions for CI with automated testing and deployment of its release\n";
    page = page + "            branch. For the students who developed this project, this project serves\n";
    page = page + "            as an exercise of SCRUM practices with three 3-week sprints over the\n";
    page = page + "            course of a Fall Semester.\n";
    page = page + "        </p>\n";
    page = page + "    </div>\n";
    if(extrafooter != ""){
        page = page + "    <hr>\n";
        page = page + "    <div>\n";
        page = page + "        " + extrafooter + "\n";
        page = page + "    </div>\n";
    }
    page = page + "</body>\n";
    page = page + "</html>\n";
    return page;
}

export default getAboutHTML;