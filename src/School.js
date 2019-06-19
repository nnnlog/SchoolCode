/*
Copyright 2019 NLOG (박찬솔)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class School {

    static parseLists(lists) {
        let result = [];
        for (let list of lists) {
            result.push(School.parseSchool(list.data));
        }

        return result;
    }

    static parseSchool(data) {
        return new School(data.kraOrgNm, data.orgCode, parseInt(data.schulCrseScCode), data.zipAdres);
    }

    constructor(name, code, type, address) {
        this._name = name;
        this._code = code;
        this._type = type;
        this._address = address;
    }

    get name() {
        return this._name;
    }

    get code() {
        return this._code;
    }

    get type() {
        return this._type;
    }

    get address() {
        return this._address;
    }

}

module.exports = School;