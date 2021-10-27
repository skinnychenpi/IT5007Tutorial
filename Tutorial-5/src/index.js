import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';


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

        const entry = {name: String(guestName.value), phNum: guestPhNum.value};
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
        // Do ISODateTime data conversion:
        var entryTime = new Date(entry.time).toDateString() + ' ' + new Date(entry.time).toLocaleTimeString();
        return (
        <tr>
            <td> {entry.serial} </td>
            <td> {entry.name} </td>
            <td> {entry.phNum} </td>
            <td> {entryTime} </td>
        </tr>
    );
    }
}

class WLTable extends React.Component {
    render() {
        const entryRows = this.props.data.map(entry => <WLTableRow key={entry.serial} entry={entry} /> );

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
        this.state = {WL: [],freeSeats : 0, isDetailShowed : false};
        this.createEntry = this.createEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.pageController = this.pageController.bind(this);
        this.loadData();
    }

    async graphQLFetch(query) {
        try {
            const response = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query })
            });
            const body = await response.text();
            const result = JSON.parse(body);

            if (result.errors) {
                const error = result.errors[0];
                if (error.extensions.code === 'BAD_USER_INPUT') {
                    const details = error.extensions.exception.errors.join('\n ');
                    alert(`${error.message}:\n ${details}`);
                } else {
                    alert(`${error.extensions.code}: ${error.message}`);
                }
            }
            return result.data;
        } catch(e) {
            alert(`Error in sending data to the server: ${e.message}`);
        }
    }


    // Integrate Read API:
    async loadData() {
        // I don't know why this variable has to me named as query, otherwise there will be problem.
        var query = `query {
          guestList {
            serial name phNum time
          }
        }`;
        
        const responseGuests = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        
        const resultGuests = await responseGuests.json();
        this.setState({ WL: resultGuests.data.guestList });

        query = `query {
            freeSeats
        }`

        const responseSeats = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });

        const resultSeats = await responseSeats.json();
        this.setState({freeSeats: resultSeats.data.freeSeats});
    }

    // Integrate Create API:
    async createEntry(entry) {
        const query = `mutation {
          guestAdd(guest:{
            name: "${entry.name}",
            phNum: "${entry.phNum}",
          }) {
            serial name phNum time
          }
        }`;
        const result = await this.graphQLFetch(query);
        this.loadData();
    }
    
    // Integrate Remove API:
    async deleteEntry() {
        const query = `mutation {
            guestDelete {
                serial
            }
        }`;

        const result = await this.graphQLFetch(query);
        this.loadData();
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
