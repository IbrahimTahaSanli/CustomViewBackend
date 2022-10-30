const fs = require("fs");
const crypto = require("crypto");

const CreateID = () => crypto.randomBytes(16).toString("hex"); 

const avalibleResponses = JSON.parse(fs.readFileSync("./data/responses/responses.json"));

const Responses = {
    AddResponse: (resp) => {
        if( !Array.isArray(resp))
            return false;

        var tmpResponse = {
            ID: CreateID(), 
            Response: resp
        }

        avalibleResponses.push(tmpResponse)

        Responses.SaveResponses();

        return true;
    },

    GetResponsesCount: ()=> avalibleResponses.length,

    GetResponseByID: (id)=> avalibleResponses.find( elem => elem.ID == id).Response,

    GetResponses: ()=>avalibleResponses,

    SaveResponses: () => {
        fs.writeFileSync("./data/responses/responses.json", JSON.stringify(avalibleResponses, null, 2));
    }
}

module.exports = Responses;