# SchoolCode

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.0.1&x2=0)](https://www.npmjs.com/package/schoolcode)

* 나이스에서 학교 코드를 받아와 제공해주는 API 입니다.

###### 학교 코드 사용처
* [학교 급식 API](https://github.com/nnnlog/SchoolMeal)

---

#### 설명

|   | SchoolCode 생성자                 |
|---|-----------------------------------|
| 1 | 지역 이름 (SchoolMeal.eduCode)    |

* SchooolCode

|        | searchSchool                     |
|--------|--------------------------------|
| 인자   | searchString                    |
| 리턴값 | Promise                         |
| 설명   | 학교를 검색합니다.                |

<br>

----

##### 예제

```js
const SchoolCode = require("schoolcode");
let search = new SchoolCode(지역 이름);

search.searchSchool(검색할 이름).then(lists => console.log(lists));
```
