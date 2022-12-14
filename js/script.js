// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {
        taskHour9: "",
        taskHour10: "",
        taskHour11: "",
        taskHour12: "",
        taskHour13: "",
        taskHour14: "",
        taskHour15: "",
        taskHour16: "",
        taskHour17: "",
    };

    // add divs to html whith current hour styling
    const d = new Date();
    let hour = d.getHours();
    for (let i = 9; i <= 17; i++) {
        $(".container").append(`
    <div id="Hour${i}" class="row time-block ${
            hour > i ? `past` : hour < i ? `future` : `present`
        } mb-2">
                <div
                    class="col-2 col-md-1 hour text-center py-3 d-flex align-items-center justify-content-center"
                >
                    ${i > 12 ? `${i - 12}PM` : `${i}AM`}
                </div><textarea class="col-8 col-md-10 description" rows="3">${
                    tasks[`taskHour${i}`]
                }</textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                </button>
            </div>
    `);
    }
    setInterval(() => {
        $("#currentDay").text(`${dayjs().format("ddd DD MMMM HH:mm:ss")}`);
    }, 200);

    $(".saveBtn").click(function () {
        let hourCount = $(this).parent().attr("id");
        tasks["task" + hourCount] = $(this).siblings("textarea").val();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        $(".popup").css("display", "flex").hide().fadeIn(1000).fadeOut(1000);
    });
});
