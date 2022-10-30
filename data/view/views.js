const fs = require("fs");
const crypto = require("crypto");

const CreateID = () => crypto.randomBytes(16).toString("hex"); 

const avalibleViews = JSON.parse(fs.readFileSync("./data/view/views.json"));

const Views = {
    AddView: (view) => {
        if( !Array.isArray(view.View))
            return false;

        i = 0;
        while(avalibleViews.find(el => el.Name === (i == 0?  view.Name: view.Name + " - " + i++ )) != undefined)
        if(i != 0)
            view.Name = view.Name + " - " + i++;

        var tmpView = {
            ID: CreateID(),
            Name:view.Name,
            View: view.View
        }

        avalibleViews.push(tmpView)

        Views.SaveViews();

        return tmpView;
    },

    GetViewsCount: ()=> avalibleViews.length,

    GetViewByID: (id)=> avalibleViews.find( elem => elem.ID === id).View,

    GetViews: ()=>avalibleViews,



    SaveViews: () => {
        fs.writeFileSync("./data/view/views.json", JSON.stringify(avalibleViews, null, 2));
    }
}

module.exports = Views;