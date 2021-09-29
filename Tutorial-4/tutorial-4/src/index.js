import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// const initialEntries = [
//     {
//       serialNo: 1, name: 'Ravan', phoneNum: '123455', time: new Date().toLocaleTimeString(),
//     },
//     {
//       serialNo: 2, name: 'Hofword', phoneNum: '123455', time: new Date().toLocaleTimeString(),
//     },
//   ];

const limit = 20;

function isNumber(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) === null || value === "") {
        return false;
   } else {
        return true;
   }
}

class DisplayFreeSlot extends React.Component {
    render() {
        return (
        <div className = "InfoHub">
        <label>Current available seats in WL:</label>
        <label className = "waitingListLoad"> {this.props.data} </label>
        </div>
        );
    }
  }

class AddCustomer extends React.Component {
    constructor() {
        super();
        this.addHandler = this.addHandler.bind(this);
    }

    addHandler(e) {
        e.preventDefault();
        var guestName = this.refs.guestNameToAdd;
        var guestPhNum = this.refs.guestPhNumToAdd;
        
        if (guestName.value === "") {
            alert("The user name can't be empty!");
            return;
        }
        
        if (!isNumber(String(guestPhNum.value))) {
            alert("Please enter valid phone number!");
            return;
        }

        const entry = {name: String(guestName.value), phoneNum: String(guestPhNum.value)};
        this.props.createEntry(entry);
        guestName.value = "";
        guestPhNum.value = "";
    }

    render() {
        return (
        <div className="AddToWL">
            <label> Enter the guest name: </label>
            <input type="text" ref = "guestNameToAdd" id="guestNameToAdd" className="guestNameToAdd"></input>
            <br></br>
            <label>Enter the guest phone number: </label>
            <input type="text" ref = "guestPhNumToAdd" id="guestPhNumToAdd" className="guestPhNumToAdd"></input>
            <button className = "submitAdd" onClick = {this.addHandler}>Add to Waiting List</button>
        </div>
        );
    }
}

class DeleteCustomer extends React.Component {
    constructor() {
        super();
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    deleteHandler(e) {
        e.preventDefault();
        this.props.deleteEntry();
    }

    render() {
        return (
        <div className="RemoveFromWL">
            <label>Remove the guest from the Waiting List: </label>
            <button className = "submitRemove" onClick = {this.deleteHandler}>Remove</button>
        </div>
        );
    }
}

class DisplayCustomer extends React.Component {
    render() {
        return (
        <div className="DisplayTable">
        <button onClick = {() => this.props.pageController(true)}>Show WL Table</button>
        </div>
        );
    }
}

class WLTableRow extends React.Component {
    render() {
        const entry = this.props.entry;
        return (
        <tr>
            <td> {entry.serialNo} </td>
            <td> {entry.name} </td>
            <td> {entry.phoneNum} </td>
            <td> {entry.time} </td>
        </tr>
    );
    }
}

class WLTable extends React.Component {
    render() {
        const entryRows = this.props.data.map(entry => <WLTableRow key={entry.serialNo} entry={entry} /> );

        return (
        <div className = "WLtable">
            <table>
                <thead>
                    <th>Serial No.</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Time Stamp</th>
                </thead>
                <tbody id = "myTbody">
                    {entryRows}
                </tbody>
            </table>
        </div>
        );
    }
}

class DisplayHomePage extends React.Component {
    render() {
        return (
        <div className = "BackToHomepage">
            <button onClick = {() => this.props.pageController(false)}>Back to homepage</button>
        </div>
        );
    }
}

class WebPage extends React.Component {
    constructor() {
        super();
        this.state = {WL: [],freeSeats : limit, isDetailShowed : false};
        this.createEntry = this.createEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.pageController = this.pageController.bind(this);
    }

    createEntry(entry) {
        var currentFree = this.state.freeSeats;
        if (currentFree === 0) {
            alert("The waiting list is already full!");
            return;
        }
        this.setState({freeSeats : --currentFree});
        entry.serialNo = this.state.WL.length + 1;
        entry.time = new Date().toLocaleTimeString();
        var newWL = this.state.WL.slice();
        newWL.push(entry);
        this.setState({WL: newWL}); 
    }

    deleteEntry() {
        var currentFree = this.state.freeSeats;
        if (currentFree === 20) {
            alert("The waiting list is empty!");
            return;
        }
        this.setState({freeSeats : ++currentFree});

        var newWL = this.state.WL.slice();
        newWL.shift();
        this.setState({WL: newWL});
    }

    pageController(logic) {
        this.setState({isDetailShowed : logic});
    }

    render() {

        var homePage = <React.Fragment><DisplayFreeSlot data = {this.state.freeSeats}/>
        <AddCustomer createEntry = {this.createEntry}/>
        <DeleteCustomer deleteEntry = {this.deleteEntry}/>
        <DisplayCustomer pageController = {this.pageController}/></React.Fragment>;

        var detailPage = <React.Fragment><WLTable data = {this.state.WL}/><DisplayHomePage pageController = {this.pageController}/></React.Fragment>;

        var pageToRender = (this.state.isDetailShowed) ? detailPage : homePage;

        return (
        <React.Fragment>
            <h1>California Hotel Reservation Waiting List System</h1>
            {pageToRender}
        </React.Fragment>
        );
    }
}


// ========================================

ReactDOM.render(
<WebPage />,
document.getElementById('root')
);
