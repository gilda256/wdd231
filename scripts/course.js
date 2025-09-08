const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const html = document.querySelector('html');
const allButton = document.querySelector('#all');
const cseButton = document.querySelector('#cse');
const wddButton = document.querySelector('#wdd');

const dialog = document.querySelector("dialog");

allButton.addEventListener('click', () => {
    generateCourseFigures(courses);
    calculateAndDisplayTotalNumberOfCreditsRequired(courses);
});

cseButton.addEventListener('click', () => {

    const cseCourses = courses.filter((course) => course.subject == "CSE");

    generateCourseFigures(cseCourses);
    calculateAndDisplayTotalNumberOfCreditsRequired(cseCourses);
});

wddButton.addEventListener('click', () => {

    const wddCourses = courses.filter((course) => course.subject == "WDD");

    generateCourseFigures(wddCourses);
    calculateAndDisplayTotalNumberOfCreditsRequired(wddCourses);
});

function conditionalCloseDialog(event) {

    const bondingRect = dialog.getBoundingClientRect();

    if ((event.x < bondingRect.left || event.x > bondingRect.right) || (event.y < bondingRect.top || event.y > bondingRect.bottom)) {
        dialog.close();
        html.removeEventListener('click', conditionalCloseDialog, true);
    }
}

function displayCourseDetailsModal(course) {
    html.addEventListener('click', conditionalCloseDialog, true);
    
    dialog.innerHTML = "";

    const closeButton = document.createElement("button");
    closeButton.id = "close-dialog-button";
    closeButton.textContent = "X";

    closeButton.addEventListener('click', function() {
        dialog.close();
    });

    const dialogHeader = document.createElement("h2");
    dialogHeader.textContent = `${course.subject} ${course.number}`;
    dialogHeader.appendChild(closeButton);

    const title = document.createElement("h3");

    title.textContent = course.title;

    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");

    p1.textContent = `${course.credits} credits`;
    p2.textContent = `Certtificate: ${course.certificate}`;
    p3.textContent = course.description;
    p4.textContent = `Technology: ${course.technology.join(", ")}`;

    dialog.appendChild(dialogHeader);
    dialog.appendChild(title);
    dialog.appendChild(p1);
    dialog.appendChild(p2);
    dialog.appendChild(p3);
    dialog.appendChild(p4);

    dialog.showModal();

    // event listener to close the modal when the user clicks outside of the modal.

}

function generateCourseFigures(selectedCourses) {
    const courseContainerElement = document.querySelector("#course_container");

    courseContainerElement.innerHTML = "";

    for (let i = 0; i < selectedCourses.length; i++) {

        const course = selectedCourses[i];
        
        const figure = document.createElement("figure");
        const figureCaption = document.createElement("figcaption");

        if (course.completed == true) {
            figure.className = "completed_class";
        }

        figure.id = `#course-${course.number}`;

        figureCaption.textContent = course.title

        figure.addEventListener('click', function() {
            displayCourseDetailsModal(course);
        });

        figure.appendChild(figureCaption);

        courseContainerElement.appendChild(figure);
    }
}

function calculateTotalCredits(total, course) {
    return total + course.credits;
}

function calculateAndDisplayTotalNumberOfCreditsRequired(selectedCourses) {

    const totalNumberOfCreditsRequiredElement = document.querySelector("#total_number_of_credits");
    totalNumberOfCreditsRequiredElement.textContent = ` ${ selectedCourses.reduce(calculateTotalCredits, 0) } `;
}

generateCourseFigures(courses);
calculateAndDisplayTotalNumberOfCreditsRequired(courses);