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