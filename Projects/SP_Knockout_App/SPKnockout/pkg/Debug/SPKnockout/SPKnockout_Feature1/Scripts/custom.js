"use strict";

var SPHostUrl = "https://corebix.sharepoint.com/sites/Dev1";
var SPAppWebUrl = "https://corebix-6195de65a523a2.sharepoint.com/sites/Dev1";

function ContactItem(fn, ln, ph, id) {
    var self = this;
    self.FirstName = fn;
    self.Phone = ph;
    self.Id = id;
    self.LastName = ln;
}

function ContactsViewModel() {
    var getUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getbytitle('Contacts')/items" + "?$select=Id,FirstName,Title,Phone" + "&$orderby=Title,FirstName" + "&@target='" + SPHostUrl + "'";
    var self = this;
    self.contacts = ko.observableArray([]);
    self.singleContact = ko.observable();
    self.showAddForm = ko.observable(false);
    self.showUpdateForm = ko.observable(false);

    function getSpList() {
        self.contacts([]);
        $.ajax({
            url: getUrl,
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                for (var i = 0; i < data.d.results.length; i++) {
                    var item = new ContactItem(data.d.results[i]["FirstName"], data.d.results[i]["Title"], data.d.results[i]["Phone"], data.d.results[i]["Id"]);
                    self.contacts.push(item);
                }
            },
            error: function () { alert("Error Loading Contacts!"); }
        });
    };

    getSpList();

    self.addContact = function () {
        self.showAddForm(true);
    };

    self.saveContact = function () {
        var saveUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getByTitle('Contacts')/items" + "?@target='" + SPHostUrl + "'";
        var fname = $('input[name="fname"]').val();
        var lname = $('input[name="lname"]').val();
        var phone = $('input[name="phone"]').val();
        $.ajax({
            url: saveUrl,
            type: "POST",
            data: ko.toJSON(
            {
                '__metadata': {
                    'type': 'SP.Data.ContactsListItem'
                },
                'FirstName': fname,
                'Title': lname,
                'Phone': phone
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function () {
                //self.contacts.push(new ContactItem(fname, lname, phone, self.contacts.Id));
                getSpList();
                self.showAddForm(false);
                //alert("Saved New Contact Successfully!");
            },
            error: function () {
                alert("Error Adding New Contact!");
                self.showAddForm(false);
            }
        });
        
    };
   
    self.deleteContact = function (contact) {
        var deleteUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getByTitle('Contacts')/getItemByStringId('" + contact.Id + "')" + "?@target='" + SPHostUrl + "'";
        $.ajax({
            url: deleteUrl,
            type: "DELETE",
            headers: {
                "accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*"
            },
            success: function () {
                //self.contacts.remove(contact);
                getSpList();
                //alert("Contact Deleted Successfully!");
            },
            error: function () {
                alert("Error Deleting Contact!");
            }
        });
    };

    self.updateContact = function (contact) {
        self.showUpdateForm(true);
        var getContactUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getByTitle('Contacts')/getItemByStringId('" + contact.Id + "')" + "?@target='" + SPHostUrl + "'";
        $.ajax({
            url: getContactUrl,
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                var item = new ContactItem(data.d.FirstName, data.d.Title, data.d.Phone, data.d.Id);
                //alert("Loaded Contact Successfully!");
                self.singleContact(item);
            },
            error: function () { alert("Error Loading Contact!"); }
        });
    }

    self.saveUpdatedContact = function (contact) {
        var updateUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" + "/web/lists/getByTitle('Contacts')/getItemByStringId('" + contact.Id + "')" + "?@target='" + SPHostUrl + "'";
        var fname = $('input[name="ufname"]').val();
        var lname = $('input[name="ulname"]').val();
        var phone = $('input[name="uphone"]').val();
        $.ajax({
            url: updateUrl,
            type: "POST",
            data: ko.toJSON(
            {
                '__metadata': {
                    'type': 'SP.Data.ContactsListItem'
                },
                'FirstName': fname,
                'Title': lname,
                'Phone': phone
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-Http-Method": "PATCH"
            },
            success: function () {
                getSpList();
                //alert("Updated Contact Successfully!");
                self.showUpdateForm(false);
            },
            error: function (err) {
                alert("Error Updating Contact!");
                self.showUpdateForm(false);
            }
        });
    }

}

$(document).ready(function () {
    ko.applyBindings(new ContactsViewModel());
});