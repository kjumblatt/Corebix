<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>





<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/knockout.js"></script>
    <script type="text/javascript" src="../Scripts/custom.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Knockout JS Demo
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div data-bind="visible: !showAddForm() && !showUpdateForm()">
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </p>
        <h2>Contacts List</h2>
        <p>There are <span data-bind="text: contacts().length"></span> contact list items.</p>
        <table>
            <thead>
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Phone</th>
                    <th>ID</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody data-bind="foreach: contacts">
                <tr>
                    <td data-bind="text: LastName"></td>
                    <td data-bind="text: FirstName"></td>
                    <td data-bind="text: Phone"></td>
                    <td data-bind="text: Id"></td>
                    <td>
                        <button data-bind="click: $root.deleteContact">Delete</button>
                    </td>
                    <td>
                        <button data-bind="click: $root.updateContact">Update</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br />
        <br />
        <button data-bind="click: $root.addContact">Add Item</button>
    </div>
    <div data-bind="visible: showAddForm()">
         <form>
            First name:<br/>
            <input type="text" name="fname" /><br/><br/>
            Last Name:<br/>
            <input type="text" name="lname" /><br/><br/>
            Phone Number:<br/>
            <input type="text" name="phone" /><br/><br/>
            <button data-bind="click: $root.saveContact">Save</button>
         </form> 
    </div>
    <div data-bind="visible: showUpdateForm(), with: singleContact">
         <form>
            First name:<br/>
            <input type="text" name="ufname" data-bind="value: FirstName" /><br/><br/>
            Last Name:<br/>
            <input type="text" name="ulname" data-bind="value: LastName" /><br/><br/>
            Phone Number:<br/>
            <input type="text" name="uphone" data-bind="value: Phone" /><br/><br/>
            <button data-bind="click: $root.saveUpdatedContact">Update</button>
         </form> 
    </div>
</asp:Content>