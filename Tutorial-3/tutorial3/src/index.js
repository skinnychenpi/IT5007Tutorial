import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

  class DisplayFreeSlot extends React.Component {
      render() {
          return (
            <div class="InfoHub">
            <label>Current available seats in WL:</label>
            <label class="waitingListLoad"> 20 </label>
            </div>
          );
      }
  }

  class AddCustomer extends React.Component {
      render() {
          return (
            <div class="AddToWL">
                <label for="guestName"> Enter the guest name: </label>
                <input type="text" id="guestNameToAdd" class="guestNameToAdd"></input>
              <br></br>
                <label for="guestName">Enter the guest phone number: </label>
                <input type="text" id="guestPhNumToAdd" class="guestPhNumToAdd"></input>
                <input type="submit" value="Add to Waiting List" class="submitAdd"></input>
            </div>
          );
        }
    }

    class DeleteCustomer extends React.Component {
        render() {
            return (
            <div class="RemoveFromWL">
                <label>Remove the guest from the Waiting List: </label>
                <input type="submit" value="Remove" class = "submitRemove"></input>
            </div>
            );
        }
    }

    class DisplayCustomer extends React.Component {
        render() {
          return (
            <div class="DisplayTable">
            <input type="submit" value="Show WL Table"></input>
            </div>
          );
        }
    }

    class WLTableRow extends React.Component {
      render() {
        return (
          <tr>
            <td> {this.props.serialNo} </td>
            <td> {this.props.name} </td>
            <td> {this.props.phoneNum} </td>
            <td> {this.props.time} </td>
          </tr>
        );
      }
    }

    class WLTable extends React.Component {
        render() {
          return (
            <div>
              <div class = "WLtable">
                <table>
                    <thead>
                        <th>Serial No.</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Time Stamp</th>
                    </thead>
                    <tbody id = "myTbody">
                      <WLTableRow serialNo = {1} name = "Cristiano Ronaldo" phoneNum = "1234567" time = {new Date().toLocaleTimeString()}/> 
                      <WLTableRow serialNo = {2} name = "Leo Messi" phoneNum = "1234567" time = {new Date().toLocaleTimeString()}/> 
                    </tbody>
                </table>
              </div>
              <div class = "BackToHomepage">
                <input type = "submit" value = "Back to homepage"></input>
              </div>
            </div>
          );
        }
    }

    class DisplayHomePage extends React.Component {
      render() {
        return (
          <React.Fragment>
            <h1>California Hotel Reservation Waiting List System</h1>
            <DisplayFreeSlot />
            <AddCustomer />
            <DeleteCustomer />
            <DisplayCustomer />
            <WLTable />
          </React.Fragment>
        );
      }
    }
    
  
  // ========================================
  
  ReactDOM.render(
    <DisplayHomePage />,
    document.getElementById('root')
  );
  