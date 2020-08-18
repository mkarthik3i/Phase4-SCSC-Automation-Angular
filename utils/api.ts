var axios = require('axios');

var apiHelper = function () {

        this.getRequest = async function (getAPIUrl: any) {
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',     
                'api_key'     :'recap'
            };
            const response = await axios({
                method: 'get',
                url: getAPIUrl,
                headers: headers,
            });

            return await response;

        } catch (error) {
            console.log("Failed");
        }
    };

    this.postRequest = async function (getAPIUrl: any, payload: any) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'api_key'     :'recap'
            };
            const response = await axios({
                method: 'post',
                url: getAPIUrl,
                headers: headers,
                data: payload
            });
            return await response;
            

        } catch (error) { 
            console.log(error);
        }
    }

    this.putRequest = async function (getAPIUrl: any, payload: any) {
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            const response = await axios({
                method: 'put',
                url: getAPIUrl,
                body: payload,
                headers: headers,
            });

            return await response;

        } catch (error) {
            console.log("Failed" + error);
        }
    }

    this.calculateAPIResponse = async function (res: { status: number; data: { data: string | any[]; }; }) {
        const apiResTotalName = [];
        if (res.status == 200) {
            const totalResLength = await res.data.data.length;
            console.log('totalResLength = ', totalResLength);
            for (let i = 0; i < totalResLength; i++) {
                const outputName = res.data.data[i].name;
                apiResTotalName.push(outputName);
            }
            return apiResTotalName;
        }
    }
}
module.exports = new apiHelper();