const SchoolCode = require("../src/SchoolCode");
process.env.TZ = 'Asia/Seoul';

let search = new SchoolCode("BUSAN");
search.searchSchool("부산대학교사범대학부설고등학교").then(lists => {
    console.log(lists);
});