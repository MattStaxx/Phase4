var crudManage = new function () {

    // An array of JSON objects with values.
    // AN ARRAY OF JSON OBJECTS WITH VALUES.
    this.projects = [
        {"Deal_Id" : 1, "Project_name" : "Aries Project", "Project_manager" : "Matt", "Project_cost" : 15000},
        {"Deal_Id" : 2, "Project_name" : "Jupiter Project", "Project_manager" : "Bob", "Project_cost" : 10350},
        {"Deal_Id" : 3, "Project_name" : "Project Sol", "Project_manager" : "Henry", "Project_cost" : 245750}
    ]

    this.col = [];

    this.createTable = function () {

        // EXTRACT VALUE FOR TABLE HEADER.
        for (var i = 0; i < this.projects.length; i++) {
            for (var key in this.projects[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CREATE A TABLE.
        var table = document.createElement('table');
        table.setAttribute('id', 'projectsTable');     // SET TABLE ID.

        var tr = table.insertRow(-1);               // CREATE A ROW FOR HEADER.

        for (var h = 0; h < this.col.length; h++) {
            // ADD A TABLE HEADER.
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // ADD ROWS USING JSON DATA.
        for (var i = 0; i < this.projects.length; i++) {

            tr = table.insertRow(-1);           // CREATE A NEW ROW.

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.projects[i][this.col[j]];
            }

            this.td = document.createElement('td');

            // *** CANCEL OPTION.
            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudManage.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            // *** SAVE.
            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudManage.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudManage.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudManage.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }


        // ADD A ROW AT THE END WITH BLANK TEXTBOXES (FOR NEW ENTRY).

        tr = table.insertRow(-1);           // CREATE THE LAST ROW.

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {
                var tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                tBox.setAttribute('type', 'text');
                tBox.setAttribute('value', '');
                newCell.appendChild(tBox);
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudManage.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
        this.td.appendChild(btNew);

        var div = document.getElementById('container');
        div.innerHTML = '';
        div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
    };

    // ****** OPERATIONS START.

    // CANCEL.
    this.Cancel = function (oButton) {

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // HIDE THE SAVE BUTTON.
        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // SHOW THE UPDATE BUTTON AGAIN.
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('projectsTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.projects[(activeRow - 1)][this.col[i]];
        }
    }


    // EDIT DATA.
    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('projectsTable').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('input');      // TEXTBOX.
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            td.innerText = '';
            td.appendChild(ele);
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };


    // DELETE DATA.
    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.projects.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
        this.createTable();                         // REFRESH THE TABLE.
    };

    // SAVE DATA.
    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('projectsTable').rows[activeRow];

        // UPDATE projects ARRAY WITH VALUES.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            this.projects[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
        }
        this.createTable();     // REFRESH THE TABLE.
    }

    // CREATE NEW.
    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('projectsTable').rows[activeRow];
        var obj = {};

        // ADD NEW VALUE TO projects ARRAY.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            var txtVal = td.childNodes[0].value;
            if (txtVal != '') {
                obj[this.col[i]] = txtVal.trim();
            }
            else {
                obj = '';
                alert('All fields must contain an appropriate value...');
                break;
            }
        }
        obj[this.col[0]] = this.projects.length + 1;     // NEW ID.

        if (Object.keys(obj).length > 0) {      // CHECK IF OBJECT IS NOT EMPTY.
            this.projects.push(obj);             // PUSH (ADD) DATA TO THE JSON ARRAY.
            this.createTable();                 // REFRESH THE TABLE.
        }
    }

    // ****** OPERATIONS END.
}

crudManage.createTable();