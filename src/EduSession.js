const request = require("request");

class EduSession {

    constructor(eduList, eduCode) {
        if (eduList[eduCode] === undefined) {
            throw new Error("교육청 코드가 잘못되었습니다.");
        }
        this._eduList = Object.assign(eduList, {});
        this._eduCode = eduCode;

        this._time = Date.now() - 1;
        this._cookie = '';
    }

    async getCookie() {
        if (this._time < Date.now() || this._cookie === '') {
            return await this.refreshCookie();
        }
        return this._cookie;
    }

    async refreshCookie() {
        let cookie_ = '';
        await (new Promise(resolve => {
            request("https://stu." + this._eduList[this._eduCode] + "/edusys.jsp?page=sts_m42310", {
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
                    }
                },
                (err, res, body) => {
                    if (err) {
                        throw new Error("데이터를 받을 수 없습니다.");
                    }
                    resolve(res.headers['set-cookie'][1].substr("JSESSIONID=".length).replace('Path=/', ''));
                });
        })).then(cookie => {
            cookie_ = cookie;
        });

        if (cookie_ === '') {
            this._time = Date.now() - 1;
        }

        this._time = Date.now() + 1000 * 60 * 30;
        return this._cookie = cookie_;
    }

}

module.exports = EduSession;