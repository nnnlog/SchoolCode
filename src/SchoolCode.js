/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const request = require("request");
const EduSession = require("./EduSession");
const School = require("./School");

class SchoolCode {

    static get eduCode() {
        return {
            SEOUL: 'sen.go.kr',
            BUSAN: 'pen.go.kr',
            DAEGU: 'dge.go.kr',
            INCHOEN: 'ice.go.kr',
            GWANGJU: 'gen.go.kr',
            DAEJEON: 'dje.go.kr',
            ULSAN: 'use.go.kr',
            SEJONG: 'sje.go.kr',
            GYEONGGI: 'goe.go.kr',
            GANGWON: 'kwe.go.kr',
            CHUNG_BUK: 'cbe.go.kr',
            CHUNK_NAM: 'cne.go.kr',
            JEON_BUK: 'jbe.go.kr',
            JEON_NAM: 'jne.go.kr',
            GYEONG_BUK: 'gbe.kr',
            GYEONG_NAM: 'gne.go.kr',
            JEJU: 'jje.go.kr'
        }
    }

    static get schoolType() {
        return {
            1: "KINDERGARTEN",
            2: "ELEMENTARY",
            3: "MIDDLE",
            4: "HIGH",
        };
    }

    /**
     *
     * @param {string} eduCode       교육청 지역 (SEOUL, BUSAN, DAEGU...)
     */
    constructor(eduCode) {
        if (SchoolCode.eduCode[eduCode] === undefined) {
            throw new Error("교육청 코드가 잘못되었습니다.");
        }
        this._code = eduCode;

        this._cookie = new EduSession(SchoolCode.eduCode, this._code);
    }

    searchSchool(searchString) {
        let that = this;
        return new Promise(async(resolve, reject) => {
            let response = null;
            await (new Promise(async(resolve) => {
                request(
                    "https://stu." + SchoolCode.eduCode[that._code] + "/spr_ccm_cm01_100.ws",
                    {
                        json: true,
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
                            'Cookie': 'JSESSIONID=' + await that._cookie.getCookie()
                        },
                        body: {
                            kraOrgNm: searchString || ""
                        }
                    },
                    (err, res, body) => {
                        if (err) {
                            reject();
                        }else{
                            resolve(body);
                        }
                    });
            })).then(body => response = body);
            if (response != null && response.resultSVO != undefined && response.resultSVO.orgDVOList != undefined) {
                let lists = response.resultSVO.orgDVOList;
                resolve(School.parseLists(lists));
            }
            reject();
        });
    }


}

module.exports = SchoolCode;
